import { useEffect, useState } from "react";
import { TranslationResponse } from "../../types/TranslationResponse";
import TranslationArea from "./TranslationArea";
import WordPageButton from "./WordPageButton";
import { Switch } from "../Components/Switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Pages from "@/chrome-extension/types/Pages";

interface Props {
  translation: TranslationResponse | null;
  isLoading: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>> | null;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

function TranslationPage({
  translation,
  text,
  setText,
  isLoading,
  setPage,
}: Props) {
  const definition = translation?.definition;
  const [popupEnabled, setPopupEnabled] = useState<boolean>(true);

  useEffect(function () {
    async function checkPopupEnabled() {
      const result = await chrome.storage.sync.get("popupEnabled");
      setPopupEnabled(result.popupEnabled ?? true);
    }
    checkPopupEnabled();
  }, []);

  function handlePopupSwitchChange() {
    setPopupEnabled((prev) => !prev);
    chrome.storage.sync.set({ popupEnabled: !popupEnabled });
  }

  return (
    <div className="flex flex-col gap-2 px-2 flex-1 relative">
      <TranslationArea
        setText={setText}
        text={text}
        translation={translation}
        isLoading={isLoading}
      />
      <WordPageButton
        isHidden={
          definition === undefined || definition === null || definition === ""
        }
        // isHidden={false}
        handleClick={() => {
          setPage("wordPage");
        }}
      />
      <div className="absolute bottom-[13px] right-[15px]">
        <HoverCard>
          <HoverCardTrigger>
            <Switch
              checked={popupEnabled}
              onCheckedChange={handlePopupSwitchChange}
            />
          </HoverCardTrigger>
          <HoverCardContent className="p-2 bg-[var(--primary)] text-center w-fit">
            <p className="font-semibold text-[var(--foreground)] text-sm">
              enable popup
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}

export default TranslationPage;
