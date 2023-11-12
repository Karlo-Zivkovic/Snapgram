import { FC } from "react";
import { RiImageAddLine } from "react-icons/ri";
import CreateEditPostForm from "../features/posts/CreateEditPostForm";

const CreatePost: FC = () => {
  return (
    <div className="w-full md:pl-[20%] lg:pl-[14%] 2xl:pl-[10%] xl:w-[60rem] xl:mr-40">
      <h1 className="flex items-center gap-3 text-4xl text-slate-50 font-bold">
        <RiImageAddLine />
        Create Post
      </h1>
      <CreateEditPostForm post={undefined as never} />
    </div>
  );
};

export default CreatePost;
