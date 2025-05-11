import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/Nav/Navbar";
import HeaderBar from "../components/HeaderBar";
import { routeToTitle } from "../utils/routesAndTitles";
import NavItem from "../components/Nav/NavItem";
import { useTheme } from "../contexts/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";

function AppLayout() {
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const title = routeToTitle(route);
  const { theme } = useTheme();
  const { fetchingToken } = useAuth();

  return (
    <div
      className={`flex flex-col-reverse gap-0 h-[100dvh] lg:flex-row ${theme} text-[var(--foreground)] bg-[var(--background)]`}
    >
      <Navbar title={title}>
        <NavItem location={title} title="home" />
        <NavItem location={title} title="saved" />
        <NavItem location={title} title="translation" />
        <NavItem location={title} title="games area" />
        <NavItem location={title} title="profile" />
      </Navbar>
      <AnimatePresence mode="wait">
        <div className="flex flex-col flex-1 gap-2 px-6 overflow-auto max-h-screen">
          <HeaderBar title={title}></HeaderBar>
          {fetchingToken ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner
                color="var(--foreground)"
                cn="w-32 h-32 border-4 rounded-full animate-spin"
              />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default AppLayout;
