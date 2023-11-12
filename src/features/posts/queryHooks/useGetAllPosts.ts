import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/postApi";

export function useGetAllPosts() {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
  return { posts, isLoadingPosts, error };
}
