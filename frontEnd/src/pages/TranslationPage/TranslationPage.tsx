import { useTranslationPage } from "../../contexts/TranslationProvider";
import { Toaster } from "@/components/ui/toaster";
import LanguageSelectors from "./LanguageSelectors";
import TranslationArea from "./TranslationArea";
import WordPageButton from "./WordPageButton";
import TranslationInputOptions from "./TranslationInputOptions";

function TranslationPage() {
  const { text } = useTranslationPage();

  return (
    <div className="flex flex-col border-t border-t-[var(--box-border)] px-1 py-8 gap-6 md:gap-10 overflow-y-auto">
      <Toaster />
      <LanguageSelectors />
      <TranslationArea />
      {text.trim() && text.trim().split(" ").length === 1 && <WordPageButton />}
      <TranslationInputOptions />
    </div>
  );
}

export default TranslationPage;
