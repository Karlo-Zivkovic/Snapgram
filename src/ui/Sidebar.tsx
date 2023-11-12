import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHomeLine, RiImageAddLine } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { FiBookmark } from "react-icons/fi";
import { useLogout } from "../features/authentication/queryHooks/useLogout";
import Loader from "./Loader";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";

const Sidebar: FC = () => {
  const { logingOut, isLogingOut } = useLogout();
  const { user } = useGetUser();

  function handleLogout() {
    logingOut();
  }

  return (
    <div className="w-[13%] 2xl:w-[16%] md:w-[16rem] p-6 pt-10 bg-neutral-950 hidden md:flex md:flex-col md:justify-between h-screen fixed">
      <div>
        <Link to="/">
          <img src="/public/logo.svg" alt="logo" />
        </Link>
        <Link to={`/profile/${user?.id}`} className="flex mt-14 gap-3">
          <img
            className="h-14 w-14 rounded-full"
            src={
              user?.user_metadata.imageUrl || "/public/profile-placeholder.svg"
            }
            alt="profile picture"
          />
          <div className="flex flex-col gap-1 text-slate-50">
            <p className="font-semibold text-xl">{user?.user_metadata.name}</p>
            <p className="text-sm text-violet-400 opacity-70">
              @{user?.user_metadata.userName}
            </p>
          </div>
        </Link>
        <ul className="mt-10 flex flex-col gap-4">
          <NavLink
            to="/"
            className="flex text-violet-500 gap-3 py-4 px-5 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 "
          >
            <RiHomeLine className="h-7 w-7" />
            <p className="text-slate-50 font-medium">Home</p>
          </NavLink>
          <NavLink
            className="flex text-violet-500 gap-3 py-4 px-5 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 "
            to="/explore"
          >
            <MdOutlineTravelExplore className="h-7 w-7" />
            <p className="text-slate-50 font-medium">Explore</p>
          </NavLink>
          <NavLink
            className="flex text-violet-500 gap-3 py-4 px-5 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 "
            to="/all-users"
          >
            <IoPeopleOutline className="h-7 w-7" />
            <p className="text-slate-50 font-medium">People</p>
          </NavLink>
          <NavLink
            className="flex text-violet-500 gap-3 py-4 px-5 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 "
            to="/saved"
          >
            <FiBookmark className="h-7 w-7" />
            <p className="text-slate-50 font-medium">Saved</p>
          </NavLink>
          <NavLink
            className="flex text-violet-500 gap-3 py-4 px-5 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 "
            to="/create-post"
          >
            <RiImageAddLine className="h-7 w-7" />
            <p className="text-slate-50 font-medium">Create Post</p>
          </NavLink>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="flex gap-3 px-5 items-center w-40 text-violet-500 hover:text-slate-50 hover:bg-violet-500 py-3 rounded-md"
      >
        {isLogingOut ? (
          <Loader size="small" />
        ) : (
          <TbLogout2 className="h-[25px] w-[25px] " />
        )}
        <p className="text-slate-50 font-medium">Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
