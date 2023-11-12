import { FC, useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { useGetSearchedPosts } from "./queryHooks/useGetSearchedPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../ui/Loader";
import SearchedPost from "./SearchedPost";
import ErrorComp from "../../ui/ErrorComp";

const SearchPosts: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    searchedPosts,
    isLoadingSearchedPosts,
    searchedPostsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSearchedPosts(searchTerm);

  const allPosts =
    searchedPosts?.pages.reduce((acc, page) => acc?.concat(page), []) || [];

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative mt-10">
        <input
          className="bg-stone-900 h-12 w-full rounded-md focus:bg-stone-800 ring-[1px] ring-opacity-50 outline-none pl-11 placeholder:opacity-50 ring-gray-500"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PiMagnifyingGlassLight
          className="opacity-50 absolute left-2 bottom-3"
          size={27}
        />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold ">Popular Today</h1>
        {searchedPostsError && (
          <ErrorComp errorMsg="Could not fetch posts, please try again later." />
        )}
        {isLoadingSearchedPosts ? (
          <div className="mt-10">
            <Loader size="medium" />
          </div>
        ) : (
          <InfiniteScroll
            className="flex w-full gap-8  flex-wrap pb-24 mt-10 "
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
              <SearchedPost key={post.id} post={post} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default SearchPosts;
