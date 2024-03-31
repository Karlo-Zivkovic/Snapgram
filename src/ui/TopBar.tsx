import { FC } from "react";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import Loader from "./Loader";
import { useLogout } from "../features/authentication/queryHooks/useLogout";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";

const TopBar: FC = () => {
  const { logingOut, isLogingOut } = useLogout();
  const { user } = useGetUser();

  function handleLogout() {
    logingOut();
  }

  return (
    <div className="fixed top-0 h-20 flex justify-between items-center px-5 w-screen bg-neutral-950 z-50 md:hidden">
      <Link to="/">
        <img src="logo.svg" alt="logo" />
      </Link>
      <div className="flex gap-8 items-center">
        <button
          onClick={handleLogout}
          className=" px-2 text-violet-500 hover:text-slate-50 hover:bg-violet-500 py-2 rounded-md"
        >
          {isLogingOut ? (
            <Loader size="small" />
          ) : (
            <TbLogout2 className="h-[35px] w-[35px] " />
          )}
        </button>{" "}
        <Link to={`/profile/${user?.id}`}>
          <img
            className="h-12 w-12 rounded-full"
            src={user?.user_metadata.imageUrl || "profile-placeholder.svg"}
            alt="profile picture"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
