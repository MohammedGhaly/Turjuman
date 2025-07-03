import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import isTokenExpired from "@/utils/isTokenExpired";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      console.log("redirecting to login from protected layout");
      navigate("/login");
    }
  });

  if (!token || isTokenExpired(token)) {
    return null;
  } else return children;
}

export default ProtectedRoute;
