import { useTranslationPage } from "@/contexts/TranslationProvider";

function DifinitionCard() {
  const {
    translation: { definition },
  } = useTranslationPage();
  return (
    <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <h2 className="mb-1 md:mb-4">Definition</h2>
      <p className="bg-[var(--inner-boxes-bg)] text-base md:text-xl font-base px-4 py-4 rounded-lg">
        {definition}
      </p>
    </div>
  );
}

export default DifinitionCard;
