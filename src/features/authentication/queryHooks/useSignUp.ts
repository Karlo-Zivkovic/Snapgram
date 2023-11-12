import { useMutation } from "@tanstack/react-query";
import { singUp } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface SignUpProps {
  name: string;
  userName: string;
  email: string;
  password: string;
}
export function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ name, userName, email, password }: SignUpProps) =>
      singUp({ name, userName, email, password }),
    onSuccess: () => {
      toast.success("You have successfully created an account");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signUp, isSigningUp };
}
