import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../../services/postApi";

export function useToggleLike() {
  const queryClient = useQueryClient();

  const { mutate: toggleLikePost, isPending: isTogglingLikePost } = useMutation(
    {
      mutationFn: ({
        post_id,
        user_id,
      }: {
        post_id: string;
        user_id: string;
      }) => toggleLike(post_id, user_id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["likes"] });
      },
    }
  );
  return { toggleLikePost, isTogglingLikePost };
}
