import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="w-full h-screen flex text-slate-50">
      <div className="w-1/2 bg-black h-screen flex justify-center items-center flex-grow">
        <Outlet />
      </div>
      <img
        className="h-screen w-1/2 hidden lg:block"
        src="SnapgramBg.jpg"
        alt="login background"
      />
    </div>
  );
};

export default AuthLayout;
