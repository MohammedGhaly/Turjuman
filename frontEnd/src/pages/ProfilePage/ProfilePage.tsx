import LogoutButton from "@/pages/ProfilePage/LogoutButton";
import SettingsOptions from "./SettingsOptions";
import SettingsInputs from "./SettingsInputs";
import ProfilePic from "./ProfilePic";
import { motion } from "framer-motion";

function ProfilePage() {
  return (
    <motion.div
      key={"profilePageMotion"}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col gap-4 items-center w-full px-9 overflow-y-auto py-6 turjuman-scrollable"
    >
      <ProfilePic />
      <div className="flex flex-col md:flex-row w-full mt-12 md:gap-6">
        <div className="w-full">
          <SettingsInputs />
        </div>
        <div className="w-full">
          <SettingsOptions />
          <LogoutButton />
        </div>
      </div>
    </motion.div>
  );
}

export default ProfilePage;
