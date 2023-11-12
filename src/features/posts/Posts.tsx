import { FC } from "react";
import Post from "./Post";
import { useGetInfinitePosts } from "./queryHooks/useGetInfinitePosts";
import Loader from "../../ui/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorComp from "../../ui/ErrorComp";

const Posts: FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinitePosts();

  const allPosts =
    data?.pages.reduce((acc, page) => acc.concat(page), []) || [];

  const fetchMoreData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (error)
    return (
      <ErrorComp errorMsg="Could not fetch posts, please try again later." />
    );

  if (isLoading || !data?.pages.length) {
    return (
      <div className="mt-10">
        <Loader size="medium" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchMoreData}
        hasMore={hasNextPage}
        loader={
          <div className="mt-4">
            <Loader size="small" />
          </div>
        }
      >
        {allPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
