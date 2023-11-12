import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import UpdateProfileForm from "../features/profile/UpdateProfileForm";
import UpdatePictureForm from "../features/profile/UpdatePictureForm";

const UpdateProfile: FC = () => {
  return (
    <div className="flex flex-col w-full md:pl-[18%] xl:pr-[17%] lg:pr-[8%] h-content">
      <h1 className="flex items-center gap-3 text-4xl text-slate-50 font-bold">
        <FaRegEdit />
        Edit Profile
      </h1>
      <UpdatePictureForm />
      <UpdateProfileForm />
    </div>
  );
};

export default UpdateProfile;
