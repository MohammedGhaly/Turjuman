import { useEffect } from "react";
import { useNavigate } from "react-router";

// import axios from "axios";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    console.log(token);
    if (token) {
      document.cookie = `jwt=${token}; path=/; secure; samesite=None`;
      navigate("/app/homepage");
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  return <p>Logging you in...</p>;
}
