import type { IRegister } from "../interfaces/iregister";

export const registerForm: IRegister = {
    username: {
        required: "Username is required",
        minLength: { value: 3, message: "Minimum 3 characters" },
        maxLength: { value: 30, message: "Maximum 30 characters" },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: "Username should only contain letters, numbers, and underscores",
        },
    },
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