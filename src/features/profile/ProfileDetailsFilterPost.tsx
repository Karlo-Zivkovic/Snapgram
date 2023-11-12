import { FC } from "react";
import usePostLike from "../../hooks/usePostLike";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkDashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import usePostBookmark from "../../hooks/usePostBookmark";

interface ProfileDetailsFilterPostProps {
  post: { id: string; imageUrl: string };
}

const ProfileDetailsFilterPost: FC<ProfileDetailsFilterPostProps> = ({
  post,
}) => {
  const {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  } = usePostLike(post.id);
  const { isBookmarkedByCurUser, isTogglingBookmarkPost, handleBookmarkPost } =
    usePostBookmark(post.id);

  return (
    <div className="relative w-full">
      <Link to={`/post/${post.id}`}>
        <img
          src={post.imageUrl}
          className="h-[19.8rem]  w-full object-cover rounded-[20px]"
          alt="post image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-[20px] to-slate-900"></div>
      </Link>
      <button
        disabled={isTogglingLikePost}
        onClick={handleLikePost}
        className="flex items-center absolute bottom-4 left-4 gap-2 disabled:opacity-50"
      >
        {isLikedByCurUser ? (
          <AiFillHeart size={23} className="text-red-500  hover:text-red-400" />
        ) : (
          <AiOutlineHeart
            size={23}
            className="text-violet-400  hover:text-red-400"
          />
        )}
        <span className="text-medium text-slate-50">{totalPostLikes}</span>
      </button>
      <button
        disabled={isTogglingBookmarkPost}
        onClick={handleBookmarkPost}
        className="flex items-center gap-2 disabled:opacity-50"
      >
        {isBookmarkedByCurUser ? (
          <BsBookmarkDashFill
            size={20}
            className="text-violet-400  absolute right-4 bottom-4"
          />
        ) : (
          <BsBookmarkDash
            size={20}
            className="text-violet-400  absolute right-4 bottom-4"
          />
        )}
      </button>
    </div>
  );
};

export default ProfileDetailsFilterPost;
