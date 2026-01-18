import { z } from "zod";
import { Role } from "./user.constant";

const createUserValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: 'email is required'}).email(),
        name: z.string({required_error: 'name is required'}),
        membershipNumber: z.string().optional(),
        image: z.string().optional(),
        role: z.enum([...Role] as [string, ...string[]]).optional(),
        phone: z.string().optional()
    })
})

const updateUserProfileValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional()
    })
})

const updatePasswordValidationSchema = z.object({
    body: z.object({
        currentPassword: z.string({required_error: 'current password is required'}),
        newPassword: z.string({required_error: 'new password is required'}).min(6, 'Password must be at least 6 characters')
    })
})

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: 'email is required'}).email(),
        password: z.string({required_error: 'password is required'})
    })
})

export const UserValidation = {
    createUserValidationSchema,
    updateUserProfileValidationSchema,
    updatePasswordValidationSchema,
    loginValidationSchema
}