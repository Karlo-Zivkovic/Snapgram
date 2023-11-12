import { FC } from "react";
import Sidebar from "../ui/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../ui/TopBar";
import BottomBar from "../ui/BottomBar";

const AppLayout: FC = () => {
  return (
    <div className="bg-black flex h-screen w-screen">
      <Sidebar />
      <TopBar />
      <BottomBar />
      <div className="w-full flex justify-center pt-24 md:pt-16 px-8 mb-20 text-slate-50 md:pl-[10rem] xl:pl-[8%] 2xl:pl-[10%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
