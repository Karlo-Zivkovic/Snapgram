import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollowUser } from "../../../services/usersApi";
import toast from "react-hot-toast";

export function useToggleFollowUser() {
  const queryClient = useQueryClient();

  const { mutate: togglingFollowUser, isPending: isFollowingUser } =
    useMutation({
      mutationFn: ({
        follower_id,
        followed_id,
      }: {
        follower_id: string;
        followed_id: string;
      }) => toggleFollowUser(follower_id, followed_id),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allFollowers"] });
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { togglingFollowUser, isFollowingUser };
}
