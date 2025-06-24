import { useToast } from "@/hooks/use-toast";
import { TranslationResponse } from "../../types/TranslationResponse";

interface Props {
  isLoading: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>> | null;
  translation: TranslationResponse | null;
}

function TranslationArea({ isLoading, text, setText, translation }: Props) {
  const { toast } = useToast();
  const copyToClipboard = async () => {
    if (translation) {
      try {
        await navigator.clipboard.writeText(translation.translation);
        toast({ title: "copied successfully", variant: "success" });
      } catch {
        toast({ title: "Failed to copy", variant: "destructive" });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 text-[var(--foreground)]">
      <div className="w-full h-28 px-2 pt-2">
        <textarea
          name="text"
          id="text"
          className="font-inter text-lg text-[var(--foreground)] turjuman-scrollable resize-none w-full h-full bg-[var(--input-background)] font-semibold border border-[var(--box-border)] rounded-lg p-3"
          placeholder="type here..."
          value={text}
          onChange={(e) => setText?.(e.target.value)}
        ></textarea>
      </div>
      <div
        className={`h-28 rounded-lg mx-2  ${
          isLoading ? "gradient-border p-[2px]" : ""
        }`}
      >
        <textarea
          name="translation"
          id="translation"
          value={
            isLoading && translation?.translation
              ? translation.translation + "..."
              : isLoading && !translation?.translation
              ? "..."
              : translation?.translation || ""
          }
          readOnly
          className={`turjuman-scrollable font-inter text-lg text-[var(--foreground)] resize-none w-full bg-[var(--input-background)] font-semibold p-3 h-full border border-[var(--box-border)] rounded-lg outline-none cursor-pointer`}
          placeholder="translation goes here..."
          onDoubleClick={copyToClipboard}
        ></textarea>
      </div>
    </div>
  );
}

export default TranslationArea;
