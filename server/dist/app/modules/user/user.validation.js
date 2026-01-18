"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        name: zod_1.z.string({ required_error: 'name is required' }),
        membershipNumber: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constant_1.Role]).optional(),
        phone: zod_1.z.string().optional()
    })
});
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional()
    })
});
const updatePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({ required_error: 'current password is required' }),
        newPassword: zod_1.z.string({ required_error: 'new password is required' }).min(6, 'Password must be at least 6 characters')
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        password: zod_1.z.string({ required_error: 'password is required' })
    })
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserProfileValidationSchema,
    updatePasswordValidationSchema,
    loginValidationSchema
};
