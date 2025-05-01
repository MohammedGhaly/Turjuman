import LogoutButton from "@/pages/ProfilePage/LogoutButton";
import SettingsOptions from "./SettingsOptions";
import SettingsInputs from "./SettingsInputs";
import ProfilePic from "./ProfilePic";

function ProfilePage() {
  return (
    <div className="flex flex-col gap-4 items-center w-full px-3 overflow-y-auto border-t border-t-[var(--box-border)] pt-6">
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
    </div>
  );
}

export default ProfilePage;
