import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetPost } from "./queryHooks/useGetPost";
import { IoReturnUpBack } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkDashFill, BsBookmarkDash } from "react-icons/bs";
import Loader from "../../ui/Loader";
import { formatTags, timeAgo } from "../../utils";
import { useDeletePost } from "./queryHooks/useDeletePost";
import usePostLike from "../../hooks/usePostLike";
import usePostBookmark from "../../hooks/usePostBookmark";
import RelatedPosts from "./RelatedPosts";
import { useGetUser } from "../authentication/queryHooks/useGetUser";
import ErrorComp from "../../ui/ErrorComp";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useGetUser();
  const { post, isLoadingPost, error } = useGetPost(postId!);
  const { deletingPost, isDeletingPost } = useDeletePost();
  const {
    isLikedByCurUser,
    totalPostLikes,
    isTogglingLikePost,
    handleLikePost,
  } = usePostLike(postId!);

  const { isBookmarkedByCurUser, isTogglingBookmarkPost, handleBookmarkPost } =
    usePostBookmark(postId!);

  if (isLoadingPost && !post)
    return (
      <div className="mt-10">
        <Loader size="big" />
      </div>
    );
  if (error)
    return (
      <ErrorComp errorMsg="Could not fetch post, please try again later." />
    );
  function handleEditPost() {
    navigate(`/edit-post/${postId}`);
  }

  function handleDeletePost() {
    deletingPost(post.id);
  }

  return (
    <div className="flex flex-col gap-8 text-slate-50 w-full md:pl-[20%] xl:pl-[16%] xl:w-[75rem] 2xl:pl-[10%]">
      <button className="flex gap-2 items-center" onClick={() => navigate(-1)}>
        <IoReturnUpBack className="text-violet-500" size={30} />{" "}
        <span className="font-medium">Back</span>
      </button>
      <div className="border border-gray-500 border-opacity-50 rounded-[20px]  flex flex-col xl:flex-row mb-2">
        <div className="w-full  h-[30rem] xl:w-[45%] p-5 rounded-l-[20px]">
          <img
            className="object-cover h-full w-full rounded-[16px]"
            src={post.imageUrl}
            alt="post image"
          />
        </div>
        <div className="flex-grow xl:rounded-r-[20px] xl:rounded-bl-none rounded-b-[20px]  bg-stone-900 px-10 py-7 ">
          <div className="border-b pb-6 border-b-gray-500 border-opacity-30 flex justify-between items-center">
            <Link
              to={`/profile/${post.users.accountId}`}
              className="flex gap-3"
            >
              <img
                className="h-14 w-14 rounded-full object-cover"
                src={post.users.imageUrl || "/public/profile-placeholder.svg"}
                alt="profile image"
              />
              <div className="flex flex-col">
                <p className="font-bold text-lg">{post.users.name}</p>
                <p className="text-sm text-violet-400 opacity-80">
                  {timeAgo(post.created_at)} &#x2022; {post.location}
                </p>
              </div>
            </Link>
            {user?.id === post.users.accountId && (
              <div className="flex gap-6 items-center">
                <button onClick={handleEditPost}>
                  <FaRegEdit
                    size={24}
                    className="text-violet-400 hover:text-violet-600"
                  />
                </button>
                {isDeletingPost ? (
                  <Loader size="small" />
                ) : (
                  <button onClick={handleDeletePost}>
                    <BsTrash3
                      className="text-red-400 hover:text-red-600"
                      size={20}
                    />
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="mt-6 text font-medium">{post.caption}</p>
          <p className="text-sm text-violet-400 opacity-80 mt-1.5">
            {formatTags(post.tags)}
          </p>
          <div className="flex justify-between mt-10 xl:mt-[15rem]">
            <button
              disabled={isTogglingLikePost}
              onClick={handleLikePost}
              className="flex items-center gap-2 disabled:opacity-50"
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
              <span className="text-medium">{totalPostLikes}</span>
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
      </div>
      <RelatedPosts post={post} />
    </div>
  );
}

export default PostDetails;
