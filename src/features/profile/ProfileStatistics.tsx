import { FC } from "react";

interface Post {
  user_id: string;
}

interface Follower {
  follower_id: string;
  followed_id: string;
}

interface ProfileStatisticsProps {
  posts: Post[] | undefined;
  followers: Follower[] | undefined;
  user_id: string | undefined;
}

const ProfileStatistics: FC<ProfileStatisticsProps> = ({
  posts,
  followers,
  user_id,
}) => {
  const postsByCurUser = posts?.filter(
    (post) => post.user_id === user_id
  ).length;

  const followersByCurUser = followers?.filter(
    (follower) => follower.followed_id === user_id
  ).length;

  const followingByCurUser = followers?.filter(
    (follower) => follower.follower_id === user_id
  ).length;

  return (
    <div className="flex gap-10 font-semibold mt-8 text-base xl:gap-4 xl:text-lg">
      <p>
        <span className="mr-3 text-violet-500">{postsByCurUser}</span>
        Posts
      </p>
      <p>
        <span className="mr-3 text-violet-500">{followersByCurUser}</span>
        Followers
      </p>
      <p>
        <span className="mr-3 text-violet-500">{followingByCurUser}</span>
        Following
      </p>
    </div>
  );
};

export default ProfileStatistics;
