import {
    emailValidationSchema,
    passwordValidationSchema
} from "./validation-rules";
import * as yup from "yup";
export const loginSchema: yup.ObjectSchema<any> = yup.object({
    email: emailValidationSchema,
    password: passwordValidationSchema,
}).required();