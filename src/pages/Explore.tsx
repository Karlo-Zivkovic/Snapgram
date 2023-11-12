import { FC } from "react";
import SearchPosts from "../features/posts/SearchPosts";

const Explore: FC = () => {
  return (
    <div className="w-full xl:pl-48 xl:w-[70rem] 2xl:pl-16 2xl:w-[62rem] md:pl-32">
      <h1 className="text-4xl text-slate-50 font-bold">Search Posts</h1>
      <SearchPosts />
    </div>
  );
};

export default Explore;
