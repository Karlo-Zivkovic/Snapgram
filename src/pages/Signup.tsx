import { FC } from "react";
import SignupForm from "../features/authentication/SignupForm";

const Signup: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img src="logo.svg" alt="logo" />
      <h1 className="sm:text-3xl text-xl font-bold mt-10">
        Create a new account
      </h1>
      <h3 className="text-violet-400 text-xs sm:text-base opacity-70 mt-2">
        To use snapgram, Please enter your details
      </h3>
      <SignupForm />
    </div>
  );
};

export default Signup;
