import { useQuery } from "@tanstack/react-query";
import { getRelatedPosts } from "../../../services/postApi";

export function useGetRelatedPosts({
  postId,
  tags,
}: {
  postId: number;
  tags: string;
}) {
  const {
    data: relatedPosts,
    isLoading: isLoadingRelatedPosts,
    error: relatedPostsError,
  } = useQuery({
    queryKey: ["relatedPosts", postId],
    queryFn: () => {
      const shouldFetchRelatedPosts = postId && tags;
      if (shouldFetchRelatedPosts) {
        return getRelatedPosts(postId, tags);
      }

      return [];
    },
  });

  return { relatedPosts, isLoadingRelatedPosts, relatedPostsError };
}
