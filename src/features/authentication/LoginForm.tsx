import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLogin } from "./queryHooks/useLogin";
import Loader from "../../ui/Loader";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const { logingIn, isPending: isLogingIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    logingIn({ email, password }, { onError: () => setFocus("email") });
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 w-[20rem] sm:w-[28rem]"
    >
      <div className="flex gap-1.5 flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="px-2 bg-stone-800 outline-none ring-1 focus:ring-violet-300 h-11 rounded-md"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Please provide valid email address",
            },
          })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>
      <div className="flex gap-1.5 flex-col mt-5">
        <label htmlFor="password">Password</label>
        <input
          className="px-2 bg-stone-800 outline-none  ring-1 focus:ring-violet-300 h-11 rounded-md"
          id="password"
          type="password"
          {...register("password", {
            required: "This field is required",
          })}
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <button className="w-full bg-violet-500 h-11 rounded-md hover:bg-violet-600 mt-7 font-medium">
        {isLogingIn ? <Loader size="small" /> : "Log in"}
      </button>
      <p className="text-center mt-5 text-base sm:text-lg">
        Don't have an account?{" "}
        <Link className="text-violet-500 hover:text-violet-600" to="/sign-up">
          Sing up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
