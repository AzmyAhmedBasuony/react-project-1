import { useState } from "react";
import { FormInput, FormButton } from "../../../../shared/components";
import type { ValidationRule } from "../../../../shared/components";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const nameValidation: ValidationRule = {
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        patternErrorMessage: "Name should only contain letters",
    };

    const emailValidation: ValidationRule = {
        pattern: /\S+@\S+\.\S+/,
        patternErrorMessage: "Invalid email address",
    };

    const passwordValidation: ValidationRule = {
        minLength: 8,
        maxLength: 50,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        patternErrorMessage: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    };

    const confirmPasswordValidation: ValidationRule = {
        customValidator: (value) => {
            if (value !== password) {
                return "Passwords do not match";
            }
            return null;
        },
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validation is handled by FormInput components
        // If form reaches here without validation errors, proceed with signup
        console.log("Signup", { firstName, lastName, email, password, agreeToTerms });
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md card">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                        type="text"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(value) => setFirstName(value as string)}
                        placeholder="Enter your first name"
                        required
                        validation={nameValidation}
                    />
                    <FormInput
                        type="text"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(value) => setLastName(value as string)}
                        placeholder="Enter your last name"
                        required
                        validation={nameValidation}
                    />
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
                    <FormInput
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(value) => setConfirmPassword(value as string)}
                        placeholder="Confirm your password"
                        required
                        validation={confirmPasswordValidation}
                    />
                    <FormInput
                        type="checkbox"
                        label="I agree to the terms and conditions"
                        name="agreeToTerms"
                        value={agreeToTerms}
                        onChange={(value) => setAgreeToTerms(value as boolean)}
                        required
                    />
                    <FormButton type="submit" fullWidth>
                        Register
                    </FormButton>
                </form>
            </div>
        </div>
    );
};

export default Signup;

