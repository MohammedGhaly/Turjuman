import { pronounce } from "@/utils/pronounce";
import { Volume1 } from "lucide-react";

interface Props {
  examples: string[];
  srcLang: string;
}

function ExamplesCard({ examples, srcLang }: Props) {
  return (
    <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <h2 className="mb-1 md:mb-4">Examples</h2>
      <div className="flex flex-col gap-3">
        {examples.map((ex) => (
          <Example text={ex} srcLang={srcLang} key={ex} />
        ))}
      </div>
    </div>
  );
}

interface ExampleProps {
  text: string;
  srcLang: string;
}

function Example({ text, srcLang }: ExampleProps) {
  return (
    <div className="bg-[var(--inner-boxes-bg)] px-4 py-3 rounded-lg flex justify-between gap-6 items-center">
      <p className="text-sm md:text-base">{text}</p>
      <button onClick={() => pronounce(text, srcLang)}>
        <Volume1 className="h-6 w-6 md:h-8 md:w-8" />
      </button>
    </div>
  );
}

export default ExamplesCard;
