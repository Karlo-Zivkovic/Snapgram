import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import CreatePostForm from "../features/posts/CreateEditPostForm";
import { useParams } from "react-router-dom";
import { useGetPost } from "../features/posts/queryHooks/useGetPost";
import Loader from "../ui/Loader";
import ErrorComp from "../ui/ErrorComp";

const EditPost: FC = () => {
  const { postId } = useParams();
  const { post, isLoadingPost, error } = useGetPost(postId!);

  if (error)
    return (
      <ErrorComp errorMsg="Could not fetch post, please try again later" />
    );

  return (
    <div className="w-[60%]">
      <h1 className="flex items-center gap-3 text-4xl text-slate-50 font-bold">
        <FaRegEdit />
        Edit Post
      </h1>
      {isLoadingPost ? (
        <div className="mt-10">
          <Loader size="big" />
        </div>
      ) : (
        <CreatePostForm post={post} />
      )}
    </div>
  );
};

export default EditPost;
