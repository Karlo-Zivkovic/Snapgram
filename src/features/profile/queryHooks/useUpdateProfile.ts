import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../../services/profileApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updatingProfile, isPending: isUpdatingProfile } = useMutation(
    {
      mutationFn: ({
        name,
        bio,
        accountId,
      }: {
        name: string;
        bio: string;
        accountId: string;
      }) => updateProfile({ name, bio, accountId }),

      onSuccess: (user) => {
        toast.success("Profile successfully updated");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate(`/profile/${user.user.id}`);
      },
    }
  );

  return { updatingProfile, isUpdatingProfile };
}
