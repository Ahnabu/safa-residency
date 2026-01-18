import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { Booking } from '../booking/booking.model';
import { Room } from '../room/room.model';
import { Service } from '../service/service.model';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getToken = async (payload: Partial<TUser>) => {
  console.log('getToken called with payload:', payload);
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    const lastUser = await User.findOne().sort({ membershipNumber: -1 });

    // Generate the next membership number
    let nextMembershipNumber = 'SAFA000001';
    if (lastUser && lastUser.membershipNumber) {
      const lastNumber = parseInt(lastUser.membershipNumber.replace('SAFA', ''), 10);
      nextMembershipNumber = `SAFA${String(lastNumber + 1).padStart(6, '0')}`;
    }

    // Hash password if provided
    let hashedPassword = undefined;
    if (payload.password) {
      hashedPassword = await bcrypt.hash(payload.password, 10);
    }

    // Create the new user with the generated membership number
    const newUser = await User.create({ 
      ...payload, 
      password: hashedPassword,
      membershipNumber: nextMembershipNumber 
    });

    const jwtPayload = {
      email: newUser.email,
      role: newUser.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: config.jwt_expires_in as string,
    });

    console.log('New user created with password:', !!hashedPassword);
    return { token, user: newUser };
  } else {
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: config.jwt_expires_in as string,
    });

    console.log('Existing user, has password:', !!user.password);
    return { token, user };
  }
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'email', 'role'];
  const users = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await users.modelQuery;
  const meta = await users.countTotal();

  return { result, meta };
};

const login = async (payload: { email: string; password: string }) => {
  console.log('Login service called with:', payload);
  const user = await User.findOne({ email: payload.email }).select('+password');
  
  console.log('User found:', user ? 'Yes' : 'No');
  if (user) {
    console.log('User has password:', user.password ? 'Yes' : 'No');
  }

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please use Google login or set a password first'
    );
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  console.log('Password valid:', isPasswordValid);

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as string,
  });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  return { token, user: userResponse };
};

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

const updateUserIntoDB = async (payload: Partial<TUser>, id: string) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
}

const updateOwnProfile = async (email: string, payload: Partial<TUser>) => {
  // Prevent users from updating sensitive fields
  const { role, membershipNumber, points, status, password, ...safePayload } = payload;
  
  const result = await User.findOneAndUpdate(
    { email },
    safePayload,
    { new: true }
  );

  return result;
};

const updatePassword = async (email: string, currentPassword: string, newPassword: string) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('User not found');
  }

  // If user has no password set (OAuth login), allow setting password
  if (user.password) {
    const bcrypt = await import('bcrypt');
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }
  }

  // Hash and update new password
  const bcrypt = await import('bcrypt');
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: 'Password updated successfully' };
};

const adminStats = async () => {
  // Total income from bookings
  const totalIncomeResult = await Booking.aggregate([
    {
      $match: { paymentStatus: "Paid" }
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$amount" }
      }
    }
  ]);

  const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

  // Total number of users
  const totalUsers = await User.countDocuments({ role: 'user' });

  // Total number of staff
  const totalStaffs = await User.countDocuments({ role: 'staff' });

  // Total number of rooms
  const roomData = await Room.aggregate([
    {
      $group: {
        _id: "$category",
        value: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1
      }
    }
  ]);

  // Last booking details
  const lastBooking = await Booking.findOne().sort({ createdAt: -1 }).populate('room').populate('user');

  // Total number of services requested
  const totalServiceRequest = await Service.countDocuments();

  // Total number of completed services
  const totalCompletedServiceRequest = await Service.countDocuments({ isCompleted: true });

  // Total number of pending services
  const totalPendingServices = await Service.countDocuments({ isCompleted: false });

  // Total number of bookings
  const totalBookings = await Booking.countDocuments();

  const monthlyData = await Booking.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        bookings: { $sum: 1 },
        revenue: { $sum: "$amount" }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  // Calculate occupancy rate for each month
  const totalRooms = await Room.countDocuments();
  const monthlyDataWithOccupancy = monthlyData.map((month) => {
    const occupancy = (month.bookings / totalRooms) * 100;
    return {
      name: new Date(0, month._id - 1).toLocaleString('default', { month: 'short' }),
      bookings: month.bookings,
      revenue: month.revenue,
      occupancy: Math.round(occupancy)
    };
  });

  const stats = {
    totalIncome,
    totalUsers,
    totalStaffs,
    roomData,
    lastBooking,
    totalServiceRequest,
    totalCompletedServiceRequest,
    totalPendingServices,
    totalBookings,
    monthlyData: monthlyDataWithOccupancy,
  }
  return stats
};

export const AuthService = {
  getToken,
  login,
  getAllUserFromDB,
  getUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  updateOwnProfile,
  updatePassword,
  adminStats
};
