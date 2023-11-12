import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkDashFill, BsBookmarkDash } from "react-icons/bs";
import usePostLike from "../../hooks/usePostLike";
import usePostBookmark from "../../hooks/usePostBookmark";

interface RelatedPostProps {
  relatedPost: {
    id: number;
    imageUrl: string;
    users: {
      imageUrl: string;
      name: string;
    };
  };
}

const RelatedPost: FC<RelatedPostProps> = ({ relatedPost }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  } = usePostLike(`${relatedPost.id!}`);

  const { isBookmarkedByCurUser, isTogglingBookmarkPost, handleBookmarkPost } =
    usePostBookmark(`${relatedPost.id!}`);

  function handleClickRelatedPost() {
    navigate(`/post/${relatedPost.id}`);
    queryClient.invalidateQueries({ queryKey: ["relatedPosts"] });
  }

  return (
    <div className="relative w-full h-[18rem]">
      <button onClick={handleClickRelatedPost} className="w-full h-[18rem]">
        <img
          className=" w-full h-full  object-cover rounded-[25px] "
          src={relatedPost.imageUrl}
          alt="post image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-[20px] to-slate-900"></div>
      </button>
      <div className="absolute font-semibold bottom-4 left-4 text-basic flex gap-2 items-center">
        <img
          className=" object-cover h-12 w-12 rounded-full"
          src={relatedPost.users.imageUrl || "/public/profile-placeholder.svg"}
          alt="post creator profile image"
        />
        <p>{relatedPost.users.name}</p>
      </div>
      <div className="absolute bottom-6 right-4 flex gap-6 items-center ">
        <button
          disabled={isTogglingLikePost}
          onClick={handleLikePost}
          className="flex items-center gap-1.5 disabled:opacity-50"
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

export default RelatedPost;
