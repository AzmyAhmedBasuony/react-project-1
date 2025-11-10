import type { ILogin } from "../interfaces/ilogin";

export const loginForm: ILogin = {
    email: {
        required: "Email is required",
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
        },
    },
    password: {
        required: "Password is required",
        minLength: { value: 8, message: "Minimum 8 characters" },
        maxLength: { value: 50, message: "Maximum 50 characters" },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
    },
};