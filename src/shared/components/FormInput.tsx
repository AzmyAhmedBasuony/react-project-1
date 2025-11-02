import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from "primereact/message";
import "./_Styles.scss";
export type InputType = "text" | "number" | "password" | "checkbox" | "textarea" | "email";

export interface ValidationRule {
    pattern?: RegExp;
    patternErrorMessage?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    customValidator?: (value: string | number | boolean) => string | null;
}

export interface FormInputProps {
    type?: InputType;
    label?: string;
    name: string;
    value: string | number | boolean;
    onChange: (value: string | number | boolean) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    validation?: ValidationRule;
    error?: string;
    showError?: boolean;
    autoFocus?: boolean;
    id?: string;
}

const FormInput = ({
    type = "text",
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    validation,
    error: externalError,
    showError = true,
    autoFocus = false,
    id,
}: FormInputProps) => {
    const [internalError, setInternalError] = useState<string>("");
    const [isTouched, setIsTouched] = useState(false);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus?.();
        }
    }, [autoFocus]);

    const validate = (val: string | number | boolean): string => {
        // Required validation
        if (required) {
            if (typeof val === "boolean") {
                // For checkbox, just check if it's false when required
                if (!val) {
                    return `${label || name} is required`;
                }
            } else if (val === "" || val === null || val === undefined) {
                return `${label || name} is required`;
            }
        }

        // Skip other validations if value is empty and not required
        if ((typeof val === "string" && val === "") || (typeof val === "number" && val === 0 && !required)) {
            return "";
        }

        if (!validation) return "";

        // String-based validations
        if (typeof val === "string") {
            // Min length validation
            if (validation.minLength !== undefined && val.length < validation.minLength) {
                return `${label || name} must be at least ${validation.minLength} characters`;
            }

            // Max length validation
            if (validation.maxLength !== undefined && val.length > validation.maxLength) {
                return `${label || name} must be no more than ${validation.maxLength} characters`;
            }

            // Regex pattern validation
            if (validation.pattern && !validation.pattern.test(val)) {
                return validation.patternErrorMessage || `${label || name} format is invalid`;
            }
        }

        // Number-based validations
        if (typeof val === "number") {
            // Min value validation
            if (validation.min !== undefined && val < validation.min) {
                return `${label || name} must be at least ${validation.min}`;
            }

            // Max value validation
            if (validation.max !== undefined && val > validation.max) {
                return `${label || name} must be no more than ${validation.max}`;
            }
        }

        // Custom validator
        if (validation.customValidator) {
            const customError = validation.customValidator(val);
            if (customError) return customError;
        }

        return "";
    };

    const handleChange = (newValue: string | number | boolean) => {
        onChange(newValue);

        if (isTouched) {
            const validationError = validate(newValue);
            setInternalError(validationError);
        }
    };

    const handleBlur = () => {
        setIsTouched(true);
        const validationError = validate(value);
        setInternalError(validationError);
    };

    const displayError = externalError || (isTouched && internalError);
    const inputId = id || name;
    const hasError = Boolean(displayError);

    const baseInputClassName = `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
        hasError ? "!border-red-500" : ""
    } ${className}`;

    const renderInput = () => {
        switch (type) {
            case "checkbox":
                return (
                    <div className="flex items-center">
                        <Checkbox
                            inputId={inputId}
                            checked={value as boolean}
                            onChange={(e) => handleChange(e.checked || false)}
                            onBlur={handleBlur}
                            disabled={disabled}
                            className={hasError ? "border-red-500!" : ""}
                        />
                        {label && (
                            <label htmlFor={inputId} className="ml-2 text-sm font-medium text-gray-700">
                                {label}
                                {required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                        )}
                    </div>
                );

            case "password":
                return (
                    <Password
                        inputId={inputId}
                        value={value as string}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={baseInputClassName}
                        inputClassName="w-full"
                        toggleMask
                        feedback={false}
                    />
                );

            case "number":
                return (
                    <InputNumber
                        inputId={inputId}
                        value={value as number}
                        onValueChange={(e) => handleChange(e.value || 0)}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={baseInputClassName}
                        ref={inputRef}
                    />
                );

            case "textarea":
                return (
                    <InputTextarea
                        id={inputId}
                        value={value as string}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={baseInputClassName}
                        rows={5}
                        autoResize
                        ref={inputRef}
                    />
                );

            case "email":
            case "text":
            default:
                return (
                    <InputText
                        id={inputId}
                        type={type === "email" ? "email" : "text"}
                        value={value as string}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={baseInputClassName}
                        ref={inputRef}
                    />
                );
        }
    };

    if (type === "checkbox") {
        return (
            <div className="mb-4">
                {renderInput()}
                {showError && displayError && (
                    <div className="mt-1">
                        <Message severity="error" text={displayError} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-gray-700 text-start mb-1"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {renderInput()}
            {showError && displayError && (
                <div className="mt-1">
                    <Message severity="error" text={displayError} />
                </div>
            )}
        </div>
    );
};

export default FormInput;

