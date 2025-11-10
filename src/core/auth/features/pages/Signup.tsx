import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../../../../shared/components/InputErrorMessage";
import { type IRegister } from "../../../../controls/interfaces/iregister";
import { registerForm } from "../../../../controls/forms/resgister";
import FormLabel from "../../../../shared/components/FormLabel";
import { registerSchema } from "../../../../controls/validations/register";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../../config/axios.config";
import { urls } from "../../../../config/urls";
import { useNavigate } from "react-router-dom";
export interface Inputs {
  username: string;
  email: string;
  password: string;
};

const inputStyles =
  "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
const buttonStyles =
  "bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition mt-2";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>(
    {
      resolver: yupResolver(registerSchema),
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axiosInstance.post(urls.register, data);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup", error);
    }
  };
  const registerFormData: IRegister = registerForm;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>


      {Object.entries(registerFormData).map(([key, value]) => (
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
      <button type="submit" className={buttonStyles}>Register</button>
    </form>
  );
};
export default Signup;
