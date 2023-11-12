import { useEffect, useState } from "react";
import { useGetAllUsers } from "../features/users/queryHooks/useGetAllUsers";
import { useGetAllPosts } from "../features/posts/queryHooks/useGetAllPosts";
import { useGetLikes } from "../features/posts/queryHooks/useGetLikes";

interface User {
  user_id: string;
  userName: string;
  id: string;
  name: string;
  imageUrl: string;
  accountId: string;
}

const useTopCreators = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const { users, isLoadingUsers, error: usersError } = useGetAllUsers();
  const { posts, isLoadingPosts, error: postsError } = useGetAllPosts();
  const { likes, isLoadingLikes, error: likesError } = useGetLikes();

  const isLoading = isLoadingUsers || isLoadingPosts || isLoadingLikes;
  const error = usersError || postsError || likesError;

  useEffect(() => {
    const userCounts = users?.map((user) => {
      const postCount = posts?.filter(
        (post) => post.user_id === user.accountId
      ).length;

      const likeCount = likes?.filter((like) => {
        const post = posts?.find((post) => post.id === like.post_id);
        return post?.user_id === user.accountId;
      }).length;

      return { ...user, postCount, likeCount };
    });

    const sortedUsers = userCounts?.sort((a, b) => {
      if (a.postCount !== b.postCount) {
        return b.postCount - a.postCount;
      }
      return b.likeCount - a.likeCount;
    });

    if (sortedUsers) {
      setTopUsers(sortedUsers);
    }
  }, [users, posts, likes]);

  return { topUsers, isLoading, error };
};

export default useTopCreators;
