import { SupportedLanguageEnum } from "@/chrome-extension/types/SupportedLanguages";
import { pronounce } from "@/chrome-extension/utils/pronounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Volume2 } from "lucide-react";

// const fakeExamples = [
//   "Do you eat meat?",
//   " He ate a hamburger.",
//   "He ate all the cakes.",
//   " He ate a hamburger for lunch.",
//   "He ate the whole cake.",
// ];

interface Props {
  isLoading: boolean;
  examples: string[] | undefined;
  lang: SupportedLanguageEnum;
}

function ExamplesTab({ examples, isLoading, lang }: Props) {
  return (
    <div className="turjuman-examples-container flex flex-col gap-2 max-h-[144px]">
      {isLoading
        ? [1, 2, 3].map((v) => (
            <div
              style={{ fontSize: "16px" }}
              key={`inner-div_${v}`}
              className="rounded-md bg-[var(--primary)]"
            >
              <Skeleton
                key={`example_skeleton_${v}`}
                className="w-full h-10 bg-[var(--skeleton)] rounded-md"
              />
            </div>
          ))
        : examples?.map((e) => <Example exampleText={e} lang={lang} key={e} />)}
    </div>
  );
}

interface ExampleProps {
  exampleText: string;
  lang: SupportedLanguageEnum;
}
function Example({ exampleText, lang }: ExampleProps) {
  return (
    <div className="border-[var(--border)] border border-solid bg-[var(--secondary)] rounded-md py-2 px-3 flex justify-between text-base items-center gap-2 font-medium">
      <p className="h-fit font-medium">{exampleText}</p>
      <button
        className="hover:bg-[var(--icon-hover)] bg-[var(--background)] border-none rounded-full h-10 w-10 flex justify-center items-center transition-colors duration-300"
        onClick={() => pronounce(exampleText, lang)}
      >
        <Volume2 color="var(--foreground)" />
      </button>
    </div>
  );
}

export default ExamplesTab;
