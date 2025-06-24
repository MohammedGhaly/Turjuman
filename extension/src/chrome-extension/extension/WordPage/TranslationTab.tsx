import { Skeleton } from "@/components/ui/skeleton";
import WordList from "./WordList";

interface Props {
  synonymsTarget: string[] | undefined;
  synonymsSource: string[] | undefined;
  isLoading: boolean;
}

function TranslationTab({ synonymsSource, synonymsTarget, isLoading }: Props) {
  return (
    <div className="flex flex-col justify-between h-full text-[var(--foreground)]">
      <div className="flex flex-col gap-3">
        {isLoading && (
          <>
            <div className="rounded-sm bg-[var(--primary)]">
              <Skeleton
                key="wordlist_skeleton_1"
                className="w-full h-8  rounded-sm bg-[var(--skeleton)]"
              />
            </div>
            <div className="rounded-sm bg-[var(--primary)]">
              <Skeleton
                key="wordlist_skeleton_2"
                className="w-full h-8 bg-[var(--skeleton)] rounded-sm"
              />
            </div>
          </>
        )}
        {!isLoading && (
          <>
            <WordList words={synonymsTarget || []} />
            <h4 className="mb-0 font-semibold">synonyms</h4>
            <WordList words={synonymsSource || []} />
          </>
        )}
      </div>
    </div>
  );
}

export default TranslationTab;
