import { emailValidationSchema,
     passwordValidationSchema, 
     usernameValidationSchema } from "./validation-rules";
import * as yup from "yup";
export const registerSchema: yup.ObjectSchema<any> = yup.object({
    username: usernameValidationSchema,
    email: emailValidationSchema,
    password: passwordValidationSchema,
}).required();