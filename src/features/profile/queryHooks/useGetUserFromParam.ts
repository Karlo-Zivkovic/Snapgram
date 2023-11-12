import { useQuery } from "@tanstack/react-query";
import { getParamUser } from "../../../services/profileApi";

export function useGetUserFromParam(user_id: string) {
  const {
    data: userParam,
    isLoading: isLoadingUserParam,
    error: userParamError,
  } = useQuery({
    queryKey: ["userParam", user_id],
    queryFn: () => getParamUser(user_id),
  });

  return { userParam, isLoadingUserParam, userParamError };
}
