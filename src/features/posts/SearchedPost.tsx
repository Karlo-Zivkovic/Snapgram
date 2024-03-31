import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkDashFill, BsBookmarkDash } from "react-icons/bs";
import usePostLike from "../../hooks/usePostLike";
import usePostBookmark from "../../hooks/usePostBookmark";
import { useNavigate } from "react-router-dom";
interface SearchedPostProps {
  post: {
    imageUrl: string;
    id: number;
    users: {
      imageUrl: string;
      name: string;
    };
  };
}

const SearchedPost: FC<SearchedPostProps> = ({ post }) => {
  const navigate = useNavigate();
  const {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  } = usePostLike(`${post.id!}`);

  const { isBookmarkedByCurUser, isTogglingBookmarkPost, handleBookmarkPost } =
    usePostBookmark(`${post.id!}`);

  function handleClickRelatedPost() {
    navigate(`/post/${post.id}`);
  }

  return (
    <div className="relative overflow-hidden h-[18rem] lg:w-fit w-full">
      <button onClick={handleClickRelatedPost} className="">
        <img
          className="object-cover lg:h-[18rem] lg:w-[18rem]  rounded-[25px] "
          src={post.imageUrl}
          alt="post image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-[20px] to-slate-900"></div>
      </button>
      <div className="absolute font-semibold bottom-4 left-4 text-basic flex gap-2 items-center">
        <img
          className=" object-cover h-12 w-12 rounded-full"
          src={post.users.imageUrl || "profile-placeholder.svg"}
          alt="post creator profile image"
        />
        <p className="text-sm">{post.users.name}</p>
      </div>
      <div className="absolute bottom-6 right-4 flex gap-6 items-center ">
        <button
          disabled={isTogglingLikePost}
          onClick={handleLikePost}
          className="flex items-center gap-1 disabled:opacity-50"
        >
          {isLikedByCurUser ? (
            <AiFillHeart
              size={25}
              className="text-red-500 hover:text-red-400"
            />
          ) : (
            <AiOutlineHeart
              size={25}
              className="text-violet-400 hover:text-red-400"
            />
          )}
          <span className="text-medium font-medium">{totalPostLikes}</span>
        </button>
        <button
          disabled={isTogglingBookmarkPost}
          onClick={handleBookmarkPost}
          className="flex items-center gap-2 disabled:opacity-50"
        >
          {isBookmarkedByCurUser ? (
            <BsBookmarkDashFill
              size={23}
              className="text-violet-400 hover:text-violet-200"
            />
          ) : (
            <BsBookmarkDash
              size={23}
              className="text-violet-400 hover:text-violet-200"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchedPost;
