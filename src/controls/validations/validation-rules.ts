import * as yup from "yup";
export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Invalid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: { value: 8, message: "Minimum 8 characters" },
    maxLength: { value: 50, message: "Maximum 50 characters" },
};

export const usernameValidation = {
    required: "Username is required",
    minLength: { value: 3, message: "Minimum 3 characters" },
    maxLength: { value: 30, message: "Maximum 30 characters" },
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "Username should only contain letters, numbers, and underscores",
    },
};
// ============yup validation rules==============
export const emailValidationSchema = yup.string().email("Invalid email address").required("Email is required");
export const passwordValidationSchema = yup.string().min(8, "Minimum 8 characters").max(50, "Maximum 50 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number").required("Password is required");
export const usernameValidationSchema = yup.string().min(3, "Minimum 3 characters").max(30, "Maximum 30 characters").matches(/^[a-zA-Z0-9_]+$/, "Username should only contain letters, numbers, and underscores").required("Username is required");
