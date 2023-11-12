import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/postApi";

export function useGetInfinitePosts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return allPages[allPages.length - 1].length > 0
        ? lastPageParam + 1
        : undefined;
    },
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
