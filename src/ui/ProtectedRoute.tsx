import { useEffect } from "react";
import { useGetUser } from "../features/authentication/queryHooks/useGetUser";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoadingUser } = useGetUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user?.role !== "authenticated" && !isLoadingUser) {
        navigate("/log-in");
      }
    },
    [isLoadingUser, navigate, user?.role]
  );

  if (user?.role === "authenticated") return children;
};

export default ProtectedRoute;
