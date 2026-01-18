import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { Role, USER_Status } from "./user.constant";
import bcrypt from 'bcrypt';

export const userSchema = new Schema<TUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    membershipNumber: { type: String },
    points: { type: Number, default: 0 },
    image: { type: String },
    role: { type: String, enum: { values: Role, message: '{VALUE} is not supported' }, default: 'user' },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: {values: USER_Status}, default: 'BASIC' },
    password: { type: String, select: false }
},
{
    timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = model<TUser>('User', userSchema);