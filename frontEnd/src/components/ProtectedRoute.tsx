import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading, fetchingToken } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!fetchingToken && !isLoading && !isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading, fetchingToken]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
