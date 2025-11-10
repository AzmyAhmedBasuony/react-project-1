import * as yup from "yup";
export const registerSchema: yup.ObjectSchema<any> = yup.object({
    username: yup.string().min(3, "Minimum 3 characters").max(30, "Maximum 30 characters").matches(/^[a-zA-Z0-9_]+$/, "Username should only contain letters, numbers, and underscores"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(8, "Minimum 8 characters").max(50, "Maximum 50 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number").required("Password is required"),
}).required();