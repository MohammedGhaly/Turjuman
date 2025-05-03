import { User } from "lucide-react";
import { titleToIcon } from "../utils/routesAndTitles";
import { useAuth } from "@/hooks/useAuth";

const hasImage = false;

interface Props {
  title: string;
}
function HeaderBar({ title }: Props) {
  const { user } = useAuth();
  return (
    <div className="w-full flex justify-between py-4 px-2 md:px-6 shrink-0">
      {/*home */}
      <div className="flex items-center gap-2">
        {titleToIcon(title, 30)}
        <span className="font-bold capitalize">{title}</span>
      </div>
      {/*user */}
      {user && (
        <div className="flex gap-3 items-center">
          <span className="font-bold"> {user?.name || ""}</span>
          <div className="bg-[var(--user-img-bg)] overflow-hidden rounded-full">
            {hasImage ? (
              <img className="" src="" alt="user pic" />
            ) : (
              <User className="m-2" strokeWidth="2px" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderBar;
