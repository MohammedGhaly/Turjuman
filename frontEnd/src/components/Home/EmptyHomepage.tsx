import { Ban } from "lucide-react";

function EmptyHomepage() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-10 col-span-2">
      <p className="text-center text-4xl mt-20 font-bold">
        Your history is empty
      </p>
      <Ban size={100} />
    </div>
  );
}

export default EmptyHomepage;
