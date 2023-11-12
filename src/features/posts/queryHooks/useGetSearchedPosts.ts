import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/postApi";

export function useGetSearchedPosts(searchTerm: string) {
  const {
    data: searchedPosts,
    isLoading: isLoadingSearchedPosts,
    error: searchedPostsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", searchTerm],
    queryFn: ({ pageParam }) => getPosts({ pageParam, searchTerm }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return allPages[allPages.length - 1].length > 0
        ? lastPageParam + 1
        : undefined;
    },
  });

  return {
    searchedPosts,
    isLoadingSearchedPosts,
    searchedPostsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
