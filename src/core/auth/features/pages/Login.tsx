import { useState } from "react";
import { FormInput, FormButton } from "../../../../shared/components";
import type { ValidationRule } from "../../../../shared/components";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailValidation: ValidationRule = {
        pattern: /\S+@\S+\.\S+/,
        patternErrorMessage: "Invalid email address",
    };

    const passwordValidation: ValidationRule = {
        minLength: 6,
        maxLength: 50,
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validation is handled by FormInput components
        // If form reaches here without validation errors, proceed with login
        console.log("Login", { email, password });
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md card">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                        type="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(value) => setEmail(value as string)}
                        placeholder="Enter your email"
                        required
                        validation={emailValidation}
                    />
                    <FormInput
                        type="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(value) => setPassword(value as string)}
                        placeholder="Enter your password"
                        required
                        validation={passwordValidation}
                    />
                    <FormButton type="submit" fullWidth>
                        Login
                    </FormButton>
                </form>
            </div>
        </div>
    );
};

export default Login;