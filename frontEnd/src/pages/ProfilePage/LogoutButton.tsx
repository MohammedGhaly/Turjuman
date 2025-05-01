import { useAuth } from "@/hooks/useAuth";
import Spinner from "../../components/Spinner";

function LogoutButton() {
  const { logout, isLoading } = useAuth();
  return (
    <button
      onClick={logout}
      className="bg-red-600 bg-opacity-25 mt-2 rounded-lg w-full text-foreground flex justify-center hover:bg-opacity-30 duration-200 transition-colors text-lg p-2 font-semibold"
    >
      {isLoading ? (
        <Spinner
          cn="w-7 h-7 border-4 rounded-full animate-spin"
          color="white"
        />
      ) : (
        "Logout"
      )}
    </button>
  );
}

export default LogoutButton;
