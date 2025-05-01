import { CirclePlus, User } from "lucide-react";

function ProfilePic() {
  return (
    <div className="relative w-fit">
      <div className="p-6 w-fit flex rounded-full overflow-hidden bg-[var(--user-img-bg)] items-center justify-center">
        <User size={140} strokeWidth="0.5px" />
      </div>
      <div className="absolute bottom-0 z-[1] right-4">
        <CirclePlus size={36} strokeWidth="1.5px" />
      </div>
    </div>
  );
}

export default ProfilePic;
