import { FC } from "react";

import DisplayAllUsers from "../features/users/DisplayAllUsers";

const AllUsers: FC = () => {
  return (
    <div className=" w-full md:pl-[20%] lg:pl-[18%] xl:pl-[17%] 2xl:pl-[13%] ">
      <h1 className="flex items-center gap-3 text-4xl text-slate-50 font-bold">
        All Users
      </h1>
      <DisplayAllUsers />
    </div>
  );
};

export default AllUsers;
