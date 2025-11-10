interface InputErrorMessageProps {
    error: string;
}

const InputErrorMessage = ({ error }: InputErrorMessageProps) => {
    return (
        <span className="text-red-500">{error}</span>
    );
};

export default InputErrorMessage;