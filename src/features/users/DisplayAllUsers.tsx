import { FC } from "react";
import { useGetAllUsers } from "./queryHooks/useGetAllUsers";
import { useToggleFollow } from "../../hooks/useToggleFollow";
import Loader from "../../ui/Loader";
import ErrorComp from "../../ui/ErrorComp";

const DisplayAllUsers: FC = () => {
  const { users, isLoadingUsers, error } = useGetAllUsers();
  const { togglingFollowUser, isFollowingUser, isUserFollowing, user } =
    useToggleFollow();

  if (error)
    return (
      <ErrorComp errorMsg="Could not fetch users, please try again later." />
    );

  function handleToggleFollow(followed_id: string) {
    togglingFollowUser({ follower_id: user!.id, followed_id });
  }

  return (
    <>
      {isLoadingUsers ? (
        <div className="mt-10">
          <Loader size="medium" />
        </div>
      ) : (
        <ul className="flex gap-5 mt-10 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap">
          {users?.map((userEntity) => {
            return (
              <li
                className="text-slate-50  border border-slate-700 rounded-[18px] py-8 flex flex-col justify-center items-center  h-[15rem]"
                key={userEntity.id}
              >
                <img
                  className="h-16 w-16 mb-2 rounded-full"
                  src={userEntity.imageUrl || "profile-placeholder.svg"}
                  alt="profile image"
                />
                <p className="font-semibold text-xl">{userEntity.name}</p>
                <p className="text-sm text-violet-500 opacity-70">
                  @{userEntity.userName}
                </p>
                {userEntity.accountId !== user!.id && (
                  <button
                    disabled={isFollowingUser}
                    onClick={() => handleToggleFollow(userEntity.accountId)}
                    className="mt-4 px-6 py-2 bg-violet-500 enabled:hover:bg-violet-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUserFollowing(userEntity.accountId)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DisplayAllUsers;
