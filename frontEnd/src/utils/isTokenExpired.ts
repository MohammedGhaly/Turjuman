import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  console.log("currentTime=> ", currentTime);
  return decodedToken.exp !== undefined ? decodedToken.exp < currentTime : true;
};

export default isTokenExpired;
