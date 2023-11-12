import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logingIn, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("You have successfully logged in!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logingIn, isPending };
}
