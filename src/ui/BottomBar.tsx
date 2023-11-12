import { FC } from "react";
import { NavLink } from "react-router-dom";
import { RiHomeLine, RiImageAddLine } from "react-icons/ri";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";

const BottomBar: FC = () => {
  return (
    <div className="fixed bottom-0 h-20 flex justify-between items-center px-6 w-screen bg-neutral-950 z-50 md:hidden">
      <NavLink
        to="/"
        className="flex flex-col text-violet-500  items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 py-2 px-4 "
      >
        <RiHomeLine className="h-7 w-7" />
        <p className="text-slate-50 font-medium">Home</p>
      </NavLink>
      <NavLink
        className="flex flex-col text-violet-500 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 py-2 px-4 "
        to="/explore"
      >
        <MdOutlineTravelExplore className="h-7 w-7" />
        <p className="text-slate-50 font-medium">Explore</p>
      </NavLink>

      <NavLink
        className="flex flex-col text-violet-500 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 py-2 px-4"
        to="/saved"
      >
        <FiBookmark className="h-7 w-7" />
        <p className="text-slate-50 font-medium">Saved</p>
      </NavLink>
      <NavLink
        className="flex flex-col text-violet-500 items-center hover aria-[current]:bg-violet-500 rounded-md aria-[current]:text-slate-50 hover:text-slate-50 hover:bg-violet-500 transition-all duration-75 py-2 px-4"
        to="/create-post"
      >
        <RiImageAddLine className="h-7 w-7" />
        <p className="text-slate-50 font-medium">Create Post</p>
      </NavLink>
    </div>
  );
};

export default BottomBar;
