import { useNavigate } from "react-router";
import { titleToIcon, titleToRoute } from "../../utils/routesAndTitles";

interface Props {
  title: string;
  location: string;
}

function NavItem({ title, location }: Props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/app/${titleToRoute(title)}`)}
      className={`cursor-pointer lg:flex gap-2 items-center p-3 lg:pl-2 lg:pr-4 lg:min-w-28 rounded-xl transition-all duration-300 ${
        location === title ? "bg-[var(--nav-item-bg)]" : ""
      } `}
    >
      {titleToIcon(title, 30)}
      <span className="hidden lg:inline capitalize font-bold">{title}</span>
    </div>
  );
}

export default NavItem;
