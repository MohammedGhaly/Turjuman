import { Toaster } from "@/components/ui/toaster";
import LanguageSelectors from "./LanguageSelectors";
import TranslationArea from "./TranslationArea";
import WordPageButton from "./WordPageButton";
import TranslationInputOptions from "./TranslationInputOptions";
import { motion } from "framer-motion";

function TranslationPage() {
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col flex-1 border-t border-t-[var(--box-border)] px-1 pb-6 md:py-8 gap-6 md:gap-10 overflow-y-auto turjuman-scrollable"
    >
      {/* <div className="flex flex-col flex-1 border-t border-t-[var(--box-border)] px-1 pb-6 md:py-8 gap-6 md:gap-10 overflow-y-auto turjuman-scrollable"> */}
      <Toaster />
      <LanguageSelectors />
      <TranslationArea />
      {/* {text.trim() && text.trim().split(" ").length === 1 && <WordPageButton />} */}
      <WordPageButton />
      <TranslationInputOptions />
      {/* </div> */}
    </motion.div>
  );
}

export default TranslationPage;
