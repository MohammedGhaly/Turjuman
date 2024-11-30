import { Volume2 } from "lucide-react";
import { useState } from "react";

const fakeExamples = [
  "Do you eat meat?",
  " He ate a hamburger for lunch.",
  "He ate the whole cake.",
  " He ate a hamburger for lunch.",
  "He ate the whole cake.",
];
function ExamplesTab() {
  const [examples] = useState(fakeExamples);
  return (
    <div className="turjuman-examples-container flex flex-col gap-2 overflow-y-scroll max-h-[144px]">
      {examples.map((e) => (
        <Example exampleText={e} />
      ))}
    </div>
  );
}

interface ExampleProps {
  exampleText: string;
}
function Example({ exampleText }: ExampleProps) {
  return (
    <div className="border-[var(--border)] border bg-[var(--secondary)] rounded-md py-2 px-3 flex justify-between text-base">
      <p>{exampleText}</p>
      <button>
        <Volume2 />
      </button>
    </div>
  );
}

export default ExamplesTab;
