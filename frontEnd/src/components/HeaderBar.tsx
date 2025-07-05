import { User } from "lucide-react";
import { titleToIcon } from "../utils/routesAndTitles";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
const hasImage = false;

interface Props {
  title: string;
}
function HeaderBar({ title }: Props) {
  const { user } = useAuth();

  return (
    <div className="mx-6">
      <div className="w-full flex justify-between py-4 px-2 md:px-6 border-b border-b-[var(--box-border)]">
        <motion.div
          key={"header-" + location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          {/* <div className="flex items-center gap-2"> */}
          {titleToIcon(title, 30)}
          <span className="font-bold capitalize">{title}</span>
          {/* </div> */}
        </motion.div>
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
    </div>
  );
}

export default HeaderBar;
