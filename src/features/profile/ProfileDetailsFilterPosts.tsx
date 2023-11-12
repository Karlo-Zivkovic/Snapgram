import { FC, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import ProfileDetailsFilterPost from "./ProfileDetailsFilterPost";
import { useGetCurUserPosts } from "../posts/queryHooks/useGetCurUserPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../ui/Loader";
import ErrorComp from "../../ui/ErrorComp";
import { useGetUser } from "../authentication/queryHooks/useGetUser";

interface ProfileDetailsFilterProps {
  user_id: string | undefined;
}

const ProfileDetailsFilter: FC<ProfileDetailsFilterProps> = ({ user_id }) => {
  const [fetchLikedPosts, setFetchLikedPosts] = useState(false);
  const { user } = useGetUser();
  const {
    curUserPosts,
    isLoadingCurUserPosts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetCurUserPosts(user_id, fetchLikedPosts);

  const allPosts =
    curUserPosts?.pages.reduce((acc, page) => acc.concat(page), []) || [];

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (error)
    return (
      <ErrorComp errorMsg="Could not fetch posts, please try again later." />
    );

  function handleChangePostsToAll() {
    setFetchLikedPosts(false);
    refetch();
  }
  function handleChangePostsToLiked() {
    setFetchLikedPosts(true);
    refetch();
  }

  return (
    <div className="w-full pb-16">
      {user?.id === user_id && (
        <div className="mt-14 w-full xl:w-fit flex  text-slate-50 items-center">
          <button
            disabled={isLoadingCurUserPosts}
            onClick={handleChangePostsToAll}
            className={`gap-2 flex items-center px-10 flex-grow ${
              fetchLikedPosts ? "bg-stone-900 opacity-80" : "bg-stone-900 "
            } rounded-l-md py-4 xl:text-base text-lg hover:opacity-100 hover:bg-stone-800 justify-center xl:px-16 xl:py-3`}
          >
            <RiImageAddLine className="text-violet-500 text-xl" /> Posts
          </button>
          <button
            disabled={isLoadingCurUserPosts}
            onClick={handleChangePostsToLiked}
            className={`gap-2 px-10 flex justify-center items-center  flex-grow bg-stone-900 rounded-r-md py-4 xl:text-base text-lg xl:py-3 ${
              !fetchLikedPosts ? "bg-stone-800 opacity-80" : "bg-stone-800 "
            } hover:opacity-100 hover:bg-stone-800`}
          >
            <AiOutlineHeart className="text-violet-500 text-xl" /> Liked Posts
          </button>
        </div>
      )}
      {isLoadingCurUserPosts ? (
        <div className="mt-10">
          <Loader size="medium" />
        </div>
      ) : allPosts?.length ? (
        <InfiniteScroll
          className="flex gap-8 flex-wrap pb-10 mt-10 sm:grid sm:grid-cols-2 md:flex lg:grid lg:grid-cols-2 xl:grid-cols-3"
          dataLength={allPosts.length}
          next={fetchMoreData}
          hasMore={hasNextPage}
          loader={
            <div className="w-[18rem] flex justify-center items-center">
              <Loader size="big" />
            </div>
          }
        >
          {allPosts.map((post) => (
            <ProfileDetailsFilterPost post={post} key={post.id} />
          ))}
        </InfiniteScroll>
      ) : (
        <p className="text-violet-400 opacity-60 text-center mt-8">No posts</p>
      )}
    </div>
  );
};

export default ProfileDetailsFilter;
