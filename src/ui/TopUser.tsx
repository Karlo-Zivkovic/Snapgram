import { FC } from "react";
import { useToggleFollow } from "../hooks/useToggleFollow";

interface TopUserProps {
  topUser: {
    name: string;
    imageUrl: string;
    userName: string;
    accountId: string;
  };
}

const TopUser: FC<TopUserProps> = ({ topUser }) => {
  const { togglingFollowUser, isFollowingUser, isUserFollowing, user } =
    useToggleFollow();

  function handleToggleFollow(followed_id: string) {
    togglingFollowUser({ follower_id: user!.id, followed_id });
  }
  return (
    <li className="border border-gray-800 rounded-[20px] h-[13rem] flex flex-col items-center justify-center xl:flex-grow 2xl:flex-grow-0 w-[45%]">
      <img
        className="h-14 w-14 rounded-full mb-1"
        src={topUser.imageUrl || "/public/profile-placeholder.svg"}
        alt="post creator profile picture"
      />
      <p className="font-semibold text-lg">{topUser.name}</p>
      <p className="text-sm text-violet-400 opacity-70">@{topUser.userName}</p>
      {topUser.accountId !== user!.id ? (
        <button
          disabled={isFollowingUser}
          onClick={() => handleToggleFollow(topUser.accountId)}
          className="mt-4 px-5 py-2 text-sm font-semibold bg-violet-500 enabled:hover:bg-violet-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUserFollowing(topUser.accountId) ? "Unfollow" : "Follow"}
        </button>
      ) : null}
    </li>
  );
};

export default TopUser;
