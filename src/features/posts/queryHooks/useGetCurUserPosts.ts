import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurUserPosts } from "../../../services/postApi";

export function useGetCurUserPosts(
  user_id: string | undefined,
  fetchLikedPosts: boolean
) {
  const {
    data: curUserPosts,
    isLoading: isLoadingCurUserPosts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts", user_id, fetchLikedPosts],
    queryFn: ({ pageParam }) =>
      getCurUserPosts(user_id, pageParam, fetchLikedPosts),
    initialPageParam: 0,

    getNextPageParam: (_, allPages, lastPageParam) => {
      return allPages[allPages.length - 1].length > 0
        ? lastPageParam + 1
        : undefined;
    },
  });

  return {
    curUserPosts,
    isLoadingCurUserPosts,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  };
}
