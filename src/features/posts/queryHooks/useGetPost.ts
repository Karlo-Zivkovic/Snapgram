import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../../services/postApi";

export function useGetPost(postId: string) {
  const {
    data: post,
    isLoading: isLoadingPost,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return { post, isLoadingPost, error };
}
