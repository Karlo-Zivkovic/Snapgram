import { useQuery } from "@tanstack/react-query";
import { getCurUserSavedPosts } from "../../../services/postApi";

export function useGetCurUserSavedPosts(user_id: string) {
  const {
    data: curUserSavedPosts,
    isLoading: isLoadingCurUserSavedPosts,
    error,
  } = useQuery({
    queryKey: ["posts-saved", user_id],
    queryFn: () => getCurUserSavedPosts(user_id),
  });

  return { curUserSavedPosts, isLoadingCurUserSavedPosts, error };
}
