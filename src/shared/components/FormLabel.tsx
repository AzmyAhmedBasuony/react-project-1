import { ReactNode } from "react";

export interface FormLabelProps {
    htmlFor?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}

const FormLabel = ({ htmlFor, required = false, children, className = "" }: FormLabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-medium text-gray-700 text-start mb-1 ${className}`}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default FormLabel;

