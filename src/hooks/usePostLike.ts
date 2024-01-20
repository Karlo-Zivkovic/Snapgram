import { useState, useEffect } from "react";
import { useToggleLike } from "../features/posts/queryHooks/useToggleLike";
import { useGetLikes } from "../features/posts/queryHooks/useGetLikes";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";

const usePostLike = (postId: string) => {
  const { toggleLikePost, isTogglingLikePost } = useToggleLike();
  const { likes} = useGetLikes();
  const { user } = useGetUser();
  const [isLikedByCurUser, setIsLikedByCurUser] = useState(false);

  useEffect(() => {
    if (likes && user) {
      const isLiked = likes.find(
        (like) => user.id === like.user_id && like.post_id === +postId,
      );
      setIsLikedByCurUser(!!isLiked);
    }
  }, [likes, user, postId]);

  const totalPostLikes = likes?.filter((like) => like.post_id === +postId)
    .length;

  const handleLikePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsLikedByCurUser(!isLikedByCurUser);
    toggleLikePost({ post_id: postId, user_id: user!.id });
  };

  return {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  };
};

export default usePostLike;
