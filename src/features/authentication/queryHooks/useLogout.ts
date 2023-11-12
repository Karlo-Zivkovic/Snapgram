import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logingOut, isPending: isLogingOut } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.clear();
      navigate("/log-in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logingOut, isLogingOut };
}
