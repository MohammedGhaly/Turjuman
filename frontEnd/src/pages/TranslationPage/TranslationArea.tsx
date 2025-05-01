import { useTranslationPage } from "@/contexts/TranslationProvider";
import { useToast } from "@/hooks/use-toast";

function TranslationArea() {
  const { text, setText, translation, isLoading } = useTranslationPage();
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
    <div className="flex flex-col gap-8 md:flex-row ">
      <div className="w-full flex-1 min-h-[20vh] md:min-h-[25vh]">
        <textarea
          name="text"
          id="text"
          className="resize-none w-full h-full bg-[var(--input-background)] font-semibold border border-[var(--box-border)] rounded-lg p-3 min-h-[20vh] md:min-h-[25vh]"
          placeholder="type here..."
          value={text}
          onChange={(e) => setText?.(e.target.value)}
        ></textarea>
      </div>
      <div
        className={`min-h-[20vh] md:min-h-[25vh] w-full flex-1 rounded-lg p-[2px]  ${
          isLoading ? "gradient-border" : ""
        }`}
      >
        <textarea
          name="translation"
          id="translation"
          value={
            isLoading && translation.translation
              ? translation.translation + "..."
              : isLoading && !translation.translation
              ? "..."
              : translation?.translation || ""
          }
          readOnly
          className={`resize-none w-full bg-[var(--input-background)] font-semibold p-3 h-full border border-[var(--box-border)] rounded-lg outline-none cursor-pointer`}
          placeholder="translation goes here..."
          onDoubleClick={copyToClipboard}
        ></textarea>
      </div>
    </div>
  );
}

export default TranslationArea;
