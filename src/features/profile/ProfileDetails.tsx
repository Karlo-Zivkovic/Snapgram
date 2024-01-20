import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ProfileStatistics from "./ProfileStatistics";
import { useGetAllFollowers } from "../users/queryHooks/useGetAllFollowers";
import Loader from "../../ui/Loader";
import ProfileDetailsFilterPosts from "./ProfileDetailsFilterPosts";
import { useGetUserFromParam } from "./queryHooks/useGetUserFromParam";
import { useGetAllPosts } from "../posts/queryHooks/useGetAllPosts";
import { useToggleFollow } from "../../hooks/useToggleFollow";
import ErrorComp from "../../ui/ErrorComp";

const ProfileDetails: FC = () => {
  const { user_id } = useParams();
  const { userParam, isLoadingUserParam, userParamError } = useGetUserFromParam(
    user_id!,
  );
  const { togglingFollowUser, isFollowingUser, isUserFollowing, user } =
    useToggleFollow();
  const navigate = useNavigate();
  const { posts, isLoadingPosts, error: postsError } = useGetAllPosts();
  const { followers, isLoadingFollowers } = useGetAllFollowers();

  if (isLoadingPosts || isLoadingFollowers || isLoadingUserParam)
    return (
      <div className="mt-10">
        <Loader size="medium" />
      </div>
    );

  if (userParamError || postsError)
    return (
      <ErrorComp errorMsg="Could not fetch user, please try again later." />
    );

  function handleToggleFollow(followed_id: string) {
    togglingFollowUser({ follower_id: user!.id, followed_id });
  }

  return (
    <div className="flex flex-col  justify-center w-full  h-fit md:pl-[18%] lg:pl-[15%] 2xl:pl-[10%]">
      <div className="text-slate-50 xl:flex-row w-full flex flex-col items-center justify-between">
        <div className="flex flex-col xl:flex-row items-center w-full gap-8 grow">
          <img
            className="h-40 w-44 rounded-full object-cover"
            src={userParam.imageUrl || "/public/profile-placeholder.svg"}
            alt="profile picture"
          />
          <div className="flex flex-col  items-center mt-5 xl:items-start w-full gap-1 grow">
            <h1 className="font-bold text-4xl">{userParam.name}</h1>
            <h3 className="text-lg text-violet-500 opacity-70">
              @{userParam.userName}
            </h3>
            <ProfileStatistics
              user_id={user_id}
              posts={posts}
              followers={followers}
            />
            {userParam.bio && (
              <p className="text-slate-50 font-medium mt-5">{userParam.bio}</p>
            )}
          </div>
        </div>
        <div className="xl:self-start xl:w-[14.2rem] xl:px-2">
          {user?.id === userParam.accountId ? (
            <button
              onClick={() =>
                navigate(`/update-profile/${userParam?.accountId}`)
              }
              className="flex items-center gap-2 bg-stone-800 xl:px-4 xl:py-3 px-8 py-4 rounded-md hover:bg-stone-700 mt-7 xl:w-fit"
            >
              <FaRegEdit className="text-violet-500 xl:text-3xl text-3xl" />
              <p className="text-lg xl:text-base font-semibold">Edit Profile</p>
            </button>
          ) : (
            <button
              disabled={isFollowingUser}
              onClick={() => handleToggleFollow(user_id!)}
              className="mt-7 px-6 py-2 text-sm font-semibold  bg-violet-500 enabled:hover:bg-violet-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed xl:px-4 xl:py-2 xl:w-fit"
            >
              {isUserFollowing(user_id!) ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <ProfileDetailsFilterPosts user_id={user_id} />
    </div>
  );
};

export default ProfileDetails;
