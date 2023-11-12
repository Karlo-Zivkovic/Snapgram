import { useGetUser } from "../features/authentication/queryHooks/useGetUser";
import { useGetAllFollowers } from "../features/users/queryHooks/useGetAllFollowers";
import { useToggleFollowUser } from "../features/users/queryHooks/useToggleFollowUser";

export function useToggleFollow() {
  const { togglingFollowUser, isFollowingUser } = useToggleFollowUser();
  const { user } = useGetUser();
  const { followers } = useGetAllFollowers();

  const isUserFollowing = (userId: string) => {
    if (followers && user) {
      return followers.some(
        (follower) =>
          follower.follower_id === user.id && follower.followed_id === userId
      );
    }
    return false;
  };
  return { togglingFollowUser, isFollowingUser, isUserFollowing, user };
}
