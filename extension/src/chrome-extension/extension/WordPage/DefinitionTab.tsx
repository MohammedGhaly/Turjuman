import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  isLoading: boolean;
  definition: string | undefined;
}

function DefinitionTab({ isLoading, definition }: Props) {
  return (
    // <div className="  rounded-lg h-auto py-1 border-[var(--border)] border">
    <>
      {isLoading ? (
        <div className="rounded-sm bg-[var(--primary)]">
          <Skeleton
            key="wordlist_skeleton_2"
            className="w-full h-14 bg-[var(--skeleton)] rounded-sm"
          />
        </div>
      ) : (
        <p className="bg-[var(--secondary)] rounded-md font-medium turjuman-scrollable overflow-y-scroll max-h-32 px-2 mx-1 py-3 border border-[var(--border)] border-solid">
          {definition}
        </p>
      )}
    </>
  );
}

export default DefinitionTab;
