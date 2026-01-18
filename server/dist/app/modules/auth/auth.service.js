"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const booking_model_1 = require("../booking/booking.model");
const room_model_1 = require("../room/room.model");
const service_model_1 = require("../service/service.model");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        const lastUser = yield user_model_1.User.findOne().sort({ membershipNumber: -1 });
        // Generate the next membership number
        let nextMembershipNumber = 'SAFA000001';
        if (lastUser && lastUser.membershipNumber) {
            const lastNumber = parseInt(lastUser.membershipNumber.replace('SAFA', ''), 10);
            nextMembershipNumber = `SAFA${String(lastNumber + 1).padStart(6, '0')}`;
        }
        // Create the new user with the generated membership number
        const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { membershipNumber: nextMembershipNumber }));
        const jwtPayload = {
            email: newUser.email,
            role: newUser.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user: newUser };
    }
    else {
        const jwtPayload = {
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user };
    }
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'email', 'role'];
    const users = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield users.modelQuery;
    const meta = yield users.countTotal();
    return { result, meta };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    if (!user.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Please use Google login or set a password first');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: config_1.default.jwt_expires_in,
    });
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    return { token, user: userResponse };
});
const getUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
});
const updateUserIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const updateOwnProfile = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Prevent users from updating sensitive fields
    const { role, membershipNumber, points, status, password } = payload, safePayload = __rest(payload, ["role", "membershipNumber", "points", "status", "password"]);
    const result = yield user_model_1.User.findOneAndUpdate({ email }, safePayload, { new: true });
    return result;
});
const updatePassword = (email, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    // If user has no password set (OAuth login), allow setting password
    if (user.password) {
        const bcrypt = yield Promise.resolve().then(() => __importStar(require('bcrypt')));
        const isPasswordValid = yield bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }
    }
    // Hash and update new password
    const bcrypt = yield Promise.resolve().then(() => __importStar(require('bcrypt')));
    user.password = yield bcrypt.hash(newPassword, 10);
    yield user.save();
    return { message: 'Password updated successfully' };
});
const adminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    // Total income from bookings
    const totalIncomeResult = yield booking_model_1.Booking.aggregate([
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
    const totalUsers = yield user_model_1.User.countDocuments({ role: 'user' });
    // Total number of staff
    const totalStaffs = yield user_model_1.User.countDocuments({ role: 'staff' });
    // Total number of rooms
    const roomData = yield room_model_1.Room.aggregate([
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
    const lastBooking = yield booking_model_1.Booking.findOne().sort({ createdAt: -1 }).populate('room').populate('user');
    // Total number of services requested
    const totalServiceRequest = yield service_model_1.Service.countDocuments();
    // Total number of completed services
    const totalCompletedServiceRequest = yield service_model_1.Service.countDocuments({ isCompleted: true });
    // Total number of pending services
    const totalPendingServices = yield service_model_1.Service.countDocuments({ isCompleted: false });
    // Total number of bookings
    const totalBookings = yield booking_model_1.Booking.countDocuments();
    const monthlyData = yield booking_model_1.Booking.aggregate([
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
    const totalRooms = yield room_model_1.Room.countDocuments();
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
    };
    return stats;
});
exports.AuthService = {
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
