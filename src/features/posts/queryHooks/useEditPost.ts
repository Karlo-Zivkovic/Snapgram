import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../../services/postApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface EditPostProps {
  caption: string;
  location: string;
  tags: string;
  id: number;
  imageUrl: string | File;
}

export function useEditPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: editingPost, isPending: isEditingPost } = useMutation({
    mutationFn: ({ caption, location, tags, id, imageUrl }: EditPostProps) =>
      editPost({ caption, location, tags, id, imageUrl }),

    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["relatedPosts", post.id] });
      navigate(`/post/${post.id}`);
      toast.success("Post successfully edited");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editingPost, isEditingPost };
}
