import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/usersApi";

export function useGetAllUsers() {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  return { users, isLoadingUsers, error };
}
