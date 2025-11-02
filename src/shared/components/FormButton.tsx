import { Button, type ButtonProps } from "primereact/button";

export interface FormButtonProps extends Omit<ButtonProps, "className"> {
    variant?: "primary" | "secondary" | "danger" | "success";
    fullWidth?: boolean;
    className?: string;
}

const FormButton = ({
    variant = "primary",
    fullWidth = false,
    className = "",
    children,
    ...rest
}: FormButtonProps) => {
    const variantClasses = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
    };

    const baseClasses = `py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${variantClasses[variant]}`;
    const widthClass = fullWidth ? "w-full flex justify-center items-center" : "";

    return (
        <Button className={`${baseClasses} ${widthClass} ${className}`} {...rest}>
            {children}
        </Button>
    );
};

export default FormButton;

