import { useMutation } from "@tanstack/react-query";
import { updatePicture } from "../../../services/profileApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdatePicture() {
  const queryClient = useQueryClient();

  const { mutate: updatingPicture, isPending: isUpdatingPicture } = useMutation(
    {
      mutationFn: (file: File) => updatePicture(file),
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data.user);
        toast.success("Image successfully uploaded");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  return { updatingPicture, isUpdatingPicture };
}
