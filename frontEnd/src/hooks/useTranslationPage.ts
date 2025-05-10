import { TranslationPageContext } from "@/contexts/TranslationPageContext";
import { useContext } from "react";

export default function useTranslationPage() {
  const context = useContext(TranslationPageContext);
  if (context === undefined)
    throw new Error(
      "'TranslationPageContext' is used outside the 'TranslationPageProvider'"
    );
  return context;
}
