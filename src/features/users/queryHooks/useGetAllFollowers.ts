import { useQuery } from "@tanstack/react-query";
import { getAllFollowers } from "../../../services/usersApi";

export function useGetAllFollowers() {
  const {
    data: followers,
    isLoading: isLoadingFollowers,
    error,
  } = useQuery({
    queryKey: ["allFollowers"],
    queryFn: getAllFollowers,
  });

  return { followers, isLoadingFollowers, error };
}
