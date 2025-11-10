export interface ILogin {
    email: ValidationRule;
    password: ValidationRule;
}
export interface ValidationRule {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
}