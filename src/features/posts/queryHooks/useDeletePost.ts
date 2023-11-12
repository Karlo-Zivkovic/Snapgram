import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../authentication/queryHooks/useGetUser";
import { deletePost } from "../../../services/postApi";

export function useDeletePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useGetUser();

  const { mutate: deletingPost, isPending: isDeletingPost } = useMutation({
    mutationFn: (post_id: string) => deletePost(post_id),
    onSuccess: () => {
      toast.success("Post successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/profile/${user!.id}`);
    },
    onError: () => {
      toast.error("Failed to delete a post");
    },
  });

  return { deletingPost, isDeletingPost };
}
