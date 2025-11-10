import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../../../../shared/components/InputErrorMessage";
import FormLabel from "../../../../shared/components/FormLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../../config/axios.config";
import { urls } from "../../../../config/urls";
import { loginSchema } from "../../../../controls/validations/loginv";
import type { ILogin } from "../../../../controls/interfaces/ilogin";
import { loginForm } from "../../../../controls/forms/loginform";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export interface Inputs {
    email: string;
    password: string;
};
interface ILoginModel {
    identifier: string;
    password: string;
}
const inputStyles =
    "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
const buttonStyles =
    "bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition mt-2";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>(
        {
            resolver: yupResolver(loginSchema),
        }
    );
    const [loading, setLoading] = useState(false);
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const loginModel: ILoginModel = {
                identifier: data.email,
                password: data.password,
            };
            const response = await axiosInstance.post(urls.login, loginModel);
            console.log("Login", response.data);
            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/home");
        } catch (error) {
            console.error("Login", error);
        } finally {
            setLoading(false);
        }
    };
    const loginFormData: ILogin = loginForm;
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4">Login</h2>


            {Object.entries(loginFormData).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                    <FormLabel htmlFor={key} required={value.required}>{key}</FormLabel>
                    <input
                        type={key}
                        placeholder={key as keyof Inputs}
                        {...register(key as keyof Inputs, value)}
                        className={inputStyles}
                    />
                    {errors[key as keyof Inputs] && (
                        <InputErrorMessage error={errors[key as keyof Inputs]?.message as string} />
                    )}
                </div>
            ))}
            <button type="submit" className={buttonStyles} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};
export default Login;
