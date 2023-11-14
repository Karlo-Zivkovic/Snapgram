import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useSignUp } from "./queryHooks/useSignUp";

type FormValues = {
  name: string;
  userName: string;
  email: string;
  password: string;
};

const SignupForm: FC = () => {
  const { signUp, isSigningUp } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    userName,
    email,
    password,
  }) => {
    signUp({ name, userName, email, password });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 w-[20rem] sm:w-[28rem]"
    >
      <div className="flex gap-1.5 flex-col">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="px-2 bg-stone-800 outline-none  ring-1 focus:ring-violet-300 h-11 rounded-md"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>
      <div className="flex gap-1.5 flex-col mt-5">
        <label htmlFor="username">Username</label>
        <input
          className="px-2 bg-stone-800 outline-none  ring-1 focus:ring-violet-300 h-11 rounded-md"
          id="username"
          {...register("userName", {
            required: "This field is required",
          })}
        />
        <p className="text-red-500">{errors.userName?.message}</p>
      </div>
      <div className="flex gap-1.5 flex-col mt-5">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="px-2 bg-stone-800 outline-none  ring-1 focus:ring-violet-300 h-11 rounded-md"
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
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
              message:
                "Minimum eight characters, one uppercase letter, one lowercase letter and one number",
            },
          })}
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <button className="w-full bg-violet-500 h-11 rounded-md hover:bg-violet-600 mt-7 font-medium">
        {isSigningUp ? <Loader size="small" /> : "Sign Up"}
      </button>
      <p className="text-center mt-5 text-base sm:text-lg">
        Alreay have an account?{" "}
        <Link className="text-violet-500 hover:text-violet-600" to="/log-in">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
