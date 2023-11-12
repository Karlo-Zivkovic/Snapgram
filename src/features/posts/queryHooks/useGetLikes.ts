import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../../services/postApi";

export function useGetLikes() {
  const {
    data: likes,
    isLoading: isLoadingLikes,
    error,
  } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikes,
  });

  return { likes, isLoadingLikes, error };
}
