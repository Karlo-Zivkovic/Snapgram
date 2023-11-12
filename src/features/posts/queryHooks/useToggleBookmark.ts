import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "../../../services/postApi";

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  const { mutate: toggleBookmarkPost, isPending: isTogglingBookmarkPost } =
    useMutation({
      mutationFn: ({
        post_id,
        user_id,
      }: {
        post_id: string;
        user_id: string;
      }) => toggleBookmark(post_id, user_id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
    });

  return { toggleBookmarkPost, isTogglingBookmarkPost };
}
