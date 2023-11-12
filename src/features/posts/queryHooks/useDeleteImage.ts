import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "../../../services/postApi";

export function useDeleteImage() {
  const { mutate: deletingImage, isPending: isDeletingImage } = useMutation({
    mutationFn: (file: File) => deleteImage(file),
  });
  return { deletingImage, isDeletingImage };
}
