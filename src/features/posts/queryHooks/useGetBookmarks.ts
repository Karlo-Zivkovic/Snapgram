import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../../services/postApi";

export function useGetBookmarks() {
  const {
    data: bookmarks,
    isLoading: isLoadingBookmarks,
    error,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
  return { bookmarks, isLoadingBookmarks, error };
}
