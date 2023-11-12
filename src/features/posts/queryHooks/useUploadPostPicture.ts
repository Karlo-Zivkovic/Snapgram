import { useMutation } from "@tanstack/react-query";
import { uploadPictureToDB } from "../../../services/profileApi";

export function useUploadPostPicture() {
  const { mutate: updatingPostPicture, isPending: isUpdatingPostPicture } =
    useMutation({
      mutationFn: (file: File) => uploadPictureToDB(file),
    });

  return { updatingPostPicture, isUpdatingPostPicture };
}
