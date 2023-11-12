import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/authApi";

export function useGetUser() {
  const {
    data: user,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return { user, isLoadingUser, error };
}
