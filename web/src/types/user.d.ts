import z, { boolean } from 'zod';

export interface UserPage {
    ID: number;
    username: string;
    email: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: number;
    email: string;
    username: string;
}

export const LoginInputSchema = z.object({
    username: z.string().min(1, 'Username cannot be empty'),
    password: z.string().min(1, 'Password cannot be empty'),
    isRemember: z.boolean(),
});
// .refine(data => data.password === data.confirmPassword, 'Please ensure both password fields match');
export type LoginInput = z.infer<typeof LoginInputSchema>;