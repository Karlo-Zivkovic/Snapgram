import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { formatTags, timeAgo } from "../../utils";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkDash, BsBookmarkDashFill } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import usePostLike from "../../hooks/usePostLike";
import usePostBookmark from "../../hooks/usePostBookmark";
import { useGetUser } from "../authentication/queryHooks/useGetUser";

interface PostProps {
  post: {
    users: { imageUrl: string; name: string; accountId: string };
    created_at: string;
    location: string;
    caption: string;
    tags: string;
    imageUrl: string;
    id: string;
  };
}
const Post: FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useGetUser();
  const {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  } = usePostLike(post.id);
  const { isBookmarkedByCurUser, isTogglingBookmarkPost, handleBookmarkPost } =
    usePostBookmark(post.id);

  return (
    <div className="w-full lg:w-[35rem] h-[35rem] bg-stone-900 rounded-[20px] p-8 border-[1px] border-slate-700 mt-10 ">
      <div className="flex justify-between  items-center">
        <div
          onClick={() => navigate(`/profile/${post.users.accountId}`)}
          className="flex gap-3 hover:cursor-pointer "
        >
          <img
            className="h-14 w-14 rounded-full"
            src={post.users.imageUrl || "profile-placeholder.svg"}
            alt="profile image"
          />
          <div className="flex flex-col">
            <p className="font-bold text-lg">{post.users.name}</p>
            <p className="text-sm text-violet-400 opacity-80">
              {timeAgo(post.created_at)} &#x2022; {post.location}
            </p>
          </div>
        </div>
        {user?.id === post.users.accountId && (
          <Link to={`/edit-post/${post.id}`}>
            <FaRegEdit size={24} className="text-violet-500" />
          </Link>
        )}
      </div>
      <p className="font-semibold mt-4">{post.caption}</p>
      <p className="text-sm text-violet-400 opacity-80 mt-1.5">
        {formatTags(post.tags)}
      </p>
      <img
        onClick={() => navigate(`/post/${post.id}`)}
        src={post.imageUrl}
        alt="post image"
        className="mt-4 object-cover w-full h-[20rem] rounded-[23px] hover:cursor-pointer"
      />
      <div className="flex justify-between items-center mt-3">
        <button
          disabled={isTogglingLikePost}
          onClick={handleLikePost}
          className="flex items-center gap-2 disabled:opacity-50"
        >
          {isLikedByCurUser ? (
            <AiFillHeart
              size={23}
              className="text-red-500 hover:text-red-400"
            />
          ) : (
            <AiOutlineHeart
              size={23}
              className="text-violet-400 hover:text-red-400"
            />
          )}
          <span className="text-medium">{totalPostLikes}</span>
        </button>
        <button
          disabled={isTogglingBookmarkPost}
          onClick={handleBookmarkPost}
          className="flex items-center gap-2 disabled:opacity-50"
        >
          {isBookmarkedByCurUser ? (
            <BsBookmarkDashFill
              size={20}
              className="text-violet-400 hover:text-violet-200"
            />
          ) : (
            <BsBookmarkDash
              size={20}
              className="text-violet-400 hover:text-violet-200"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Post;
