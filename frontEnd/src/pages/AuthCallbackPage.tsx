import { useEffect } from "react";
import { useNavigate } from "react-router";

// import axios from "axios";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    console.log(token);
    if (token) {
      // Save the token manually to a
      document.cookie = `jwt=${token}; path=/; secure; samesite=None`;

      //   Optional: call backend with this token to verify/store it
      navigate("/app/homepage");
    } else {
      // handle failure
      navigate("/login");
    }
  }, [navigate, token]);

  return <p>Logging you in...</p>;
}
