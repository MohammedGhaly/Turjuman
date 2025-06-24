import { useEffect, useState } from "react";
import isTokenExpired from "../utils/isTokenExpired";
import ExtensionView from "./ExtensionView";
import LoginView from "./Auth/LoginView";

function ExtensionApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const { jwt } = await chrome.storage.local.get("jwt");
      if (!jwt || isTokenExpired(jwt)) {
        await chrome.storage.local.remove("jwt");
      } else {
        setIsLoggedIn(true);
      }
    }
    checkToken();
  }, []);

  if (isLoggedIn) return <ExtensionView />;
  return <LoginView setIsLoggedIn={setIsLoggedIn} />;
}
export default ExtensionApp;
