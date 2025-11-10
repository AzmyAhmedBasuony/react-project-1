import { useForm, type SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../../../../shared/components/InputErrorMessage";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const inputStyles =
  "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";
const buttonStyles =
  "bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition mt-2";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Signup", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Enter your username"
        {...register("username", {
          required: "Username is required",
          minLength: { value: 3, message: "Minimum 3 characters" },
          maxLength: { value: 30, message: "Maximum 30 characters" },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message:
              "Username should only contain letters, numbers, and underscores",
          },
        })}
        className={inputStyles}
      />
      {errors.username && (
        <InputErrorMessage error={errors.username.message as string} />
      )}

      <input
        type="email"
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        })}
        className={inputStyles}
      />
      {errors.email && (
        <InputErrorMessage error={errors.email.message as string} />
      )}

      <input
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
          maxLength: { value: 50, message: "Maximum 50 characters" },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, and one number",
          },
        })}
        className={inputStyles}
      />
      {errors.password && (
        <InputErrorMessage error={errors.password.message as string} />
      )}

      <input type="submit" value="Register" className={buttonStyles} />
    </form>
  );
};

export default Signup;

