import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateProfile } from "./queryHooks/useUpdateProfile";
import { useGetUser } from "../authentication/queryHooks/useGetUser";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

type FormValues = {
  name: string;
  bio: string;
};

const UpdateProfileForm: FC = () => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  const { updatingProfile, isUpdatingProfile } = useUpdateProfile();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: user?.user_metadata.name,
      bio: user?.user_metadata.bio,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ name, bio }) => {
    updatingProfile({ name, bio, accountId: user!.id });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-slate-50 mt-10 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2 text-medium font-semibold">
        <label htmlFor="name">Name</label>
        <input
          className="px-2 bg-stone-800 outline-none ring-1 focus:ring-violet-300 h-11 w-full  rounded-md"
          id="name"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col gap-2 text-medium font-semibold">
        <label htmlFor="userName">userName</label>
        <input
          disabled
          placeholder={user?.user_metadata.userName}
          className="cursor-not-allowed disabled:opacity-60 px-2 bg-stone-800 outline-none ring-1 focus:ring-violet-300 h-11 w-full rounded-md"
          id="userName"
        />
      </div>
      <div className="flex flex-col gap-2 text-medium font-semibold">
        <label htmlFor="email">Email</label>
        <input
          disabled
          placeholder={user?.email}
          className="cursor-not-allowed disabled:opacity-60 px-2 bg-stone-800 outline-none ring-1 focus:ring-violet-300 h-11 w-full  rounded-md"
          id="email"
        />
      </div>
      <div className="flex flex-col gap-2 text-medium font-semibold">
        <label htmlFor="bio">Bio</label>
        <textarea
          className="p-2 bg-stone-800 outline-none ring-1 focus:ring-violet-300  w-full  rounded-md"
          id="bio"
          rows={5}
          {...register("bio")}
        />
      </div>
      <div className="flex justify-end gap-4 text-sm mt-1">
        <button
          onClick={() => navigate(`/profile/${user?.id}`)}
          className="px-6 rounded-md bg-stone-800 hover:bg-stone-700"
        >
          Cancel
        </button>
        <button
          className="py-3 px-6 bg-violet-500 rounded-md hover:bg-violet-600 font-semibold"
          type="submit"
        >
          {isUpdatingProfile ? <Loader size="small" /> : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
