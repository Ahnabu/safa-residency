"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    membershipNumber: { type: String },
    points: { type: Number, default: 0 },
    image: { type: String },
    role: { type: String, enum: { values: user_constant_1.Role, message: '{VALUE} is not supported' }, default: 'user' },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: { values: user_constant_1.USER_Status }, default: 'BASIC' },
    password: { type: String, select: false }
}, {
    timestamps: true
});
// Hash password before saving
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password') && this.password) {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
