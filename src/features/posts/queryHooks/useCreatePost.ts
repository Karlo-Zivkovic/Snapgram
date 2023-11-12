import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../services/postApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface CreatePostProps {
  caption: string;
  file: File | undefined;
  location: string;
  tags: string;
  user_id: string;
}

export function useCreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: creatingPost, isPending: isCreatingPost } = useMutation({
    mutationFn: ({ caption, file, location, tags, user_id }: CreatePostProps) =>
      createPost({ caption, file, location, tags, user_id }),

    onSuccess: () => {
      toast.success("Post successfully created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to create a post");
    },
  });

  return { creatingPost, isCreatingPost };
}
