import { FC } from "react";
import LoginForm from "../features/authentication/LoginForm";

const Login: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="" src="logo.svg" alt="logo" />
      <h1 className="sm:text-3xl font-bold mt-10 text-xl">
        Log in to your account
      </h1>
      <h3 className="text-violet-400 sm:text-base text-xs opacity-70 mt-2">
        Welcome back! Please enter your details.
      </h3>
      <LoginForm />
    </div>
  );
};

export default Login;
