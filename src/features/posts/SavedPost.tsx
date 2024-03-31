import { FC } from "react";
import { Link } from "react-router-dom";

interface SavedPostProps {
  post: {
    id: string;
    imageUrl: string;
    users: {
      imageUrl: string;
      name: string;
    };
  };
}

const SavedPost: FC<SavedPostProps> = ({ post }) => {
  return (
    <Link className="relative w-full  h-[18rem]" to={`/post/${post.id}`}>
      <img
        className=" w-full h-full  object-cover rounded-[20px]"
        src={post.imageUrl}
        alt="post image"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-[20px] to-slate-900"></div>
      <div className="absolute font-semibold bottom-4 left-4 flex gap-2 items-center">
        <img
          className=" object-cover h-12 w-12 rounded-full"
          src={post.users.imageUrl || "profile-placeholder.svg"}
          alt="post creator profile picture"
        />
        <p className="text-xs">{post.users.name}</p>
      </div>
    </Link>
  );
};

export default SavedPost;
