import { FC } from "react";
import { BsBookmarkDash } from "react-icons/bs";
import { useGetCurUserSavedPosts } from "../features/posts/queryHooks/useGetCurUserSavedPosts";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";
import Loader from "../ui/Loader";
import SavedPost from "../features/posts/SavedPost";
import ErrorComp from "../ui/ErrorComp";

const Saved: FC = () => {
  const { user } = useGetUser();
  const { curUserSavedPosts, isLoadingCurUserSavedPosts, error } =
    useGetCurUserSavedPosts(user!.id);

  return (
    <div className=" w-full h-screen md:pl-[16%] 2xl:px-[10%] 2xl:mx-16">
      <h1 className="flex items-center gap-3 text-4xl text-slate-50 font-bold">
        <BsBookmarkDash /> Saved Posts
      </h1>
      {error && (
        <ErrorComp errorMsg="Could not fetch posts, please try again later." />
      )}
      {isLoadingCurUserSavedPosts ? (
        <div className="mt-10">
          <Loader size="medium" />
        </div>
      ) : (
        <ul className="flex gap-8 sm:grid sm:grid-cols-2 md:flex flex-wrap mt-10 lg:grid lg:grid-cols-2 xl:grid-cols-3 pb-24">
          {curUserSavedPosts?.map((post) => (
            <SavedPost post={post.posts} key={post.id} />
          ))}
        </ul>
      )}
      {!curUserSavedPosts?.length && !isLoadingCurUserSavedPosts && (
        <p className="text-violet-400 opacity-60 text-center mt-8">
          No saved posts
        </p>
      )}
    </div>
  );
};

export default Saved;
