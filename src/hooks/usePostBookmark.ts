import { useState, useEffect } from "react";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";
import { useGetBookmarks } from "../features/posts/queryHooks/useGetBookmarks";
import { useToggleBookmark } from "../features/posts/queryHooks/useToggleBookmark";

const usePostBookmark = (postId: string) => {
  const { toggleBookmarkPost, isTogglingBookmarkPost } = useToggleBookmark();
  const { bookmarks} = useGetBookmarks();
  const { user } = useGetUser();
  const [isBookmarkedByCurUser, setIsBookmarkedByCurUser] = useState(false);

  useEffect(() => {
    if (bookmarks && user) {
      const isBookmarked = bookmarks.find(
        (bookmark) =>
          user.id === bookmark.user_id && bookmark.post_id === +postId
      );
      setIsBookmarkedByCurUser(!!isBookmarked);
    }
  }, [bookmarks, user, postId]);

  const handleBookmarkPost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsBookmarkedByCurUser(!isBookmarkedByCurUser);
    toggleBookmarkPost({ post_id: postId, user_id: user!.id });
  };

  return {
    isBookmarkedByCurUser,
    isTogglingBookmarkPost,
    handleBookmarkPost,
  };
};

export default usePostBookmark;
