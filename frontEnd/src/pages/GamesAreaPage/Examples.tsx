import { pronounce } from "@/utils/pronounce";
import { Volume1 } from "lucide-react";

interface Props {
  examples: string[];
  lang: string;
}

function Examples({ examples, lang }: Props) {
  return (
    <div className="text-lg md:text-xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] ">
      <h2 className="font-bold text-base md:text-lg">Examples</h2>
      <div className="flex flex-col gap-2">
        {examples.map((ex) => (
          <Example text={ex} lang={lang} key={ex} />
        ))}
      </div>
    </div>
  );
}

interface ExampleProps {
  text: string;
  lang: string;
}

function Example({ text, lang }: ExampleProps) {
  return (
    <div className="bg-[var(--inner-boxes-bg)] px-3 py-2 rounded-lg flex justify-between gap-6 items-center">
      <p className="text-sm md:text-base">{text}</p>
      <button onClick={() => pronounce(text, lang)}>
        <Volume1 className="h-6 w-6 md:h-8 md:w-8" />
      </button>
    </div>
  );
}

export default Examples;
