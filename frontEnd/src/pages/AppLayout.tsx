import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Nav/Navbar";
import HeaderBar from "../components/HeaderBar";
import { routeToTitle } from "../utils/routesAndTitles";
import NavItem from "../components/Nav/NavItem";
import { useTheme } from "../contexts/ThemeProvider";

function AppLayout() {
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const title = routeToTitle(route);
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col-reverse gap-2 h-screen lg:flex-row ${theme} text-[var(--foreground)] bg-[var(--background)]`}
    >
      <Navbar title={title}>
        <NavItem location={title} title="home" />
        <NavItem location={title} title="saved" />
        <NavItem location={title} title="translation" />
        <NavItem location={title} title="games area" />
        <NavItem location={title} title="profile" />
      </Navbar>
      <div className="flex flex-col flex-1 gap-2 px-6 overflow-auto max-h-screen">
        <HeaderBar title={title}></HeaderBar>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
