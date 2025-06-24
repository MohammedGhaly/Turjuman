import { useEffect, useState } from "react";
import { TranslationResponse } from "../types/TranslationResponse";
import ErrorComponent from "./Error";

interface Props {
  text: string;
  srcLang: string;
  targetLang: string;
  langsFetched: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function SentencePopup({
  text,
  srcLang,
  targetLang,
  langsFetched,
  isLoading,
  setIsLoading,
}: Props) {
  const [translation, setTranslation] = useState<TranslationResponse | null>(
    null
  );
  const [error, setError] = useState("");

  async function getTranslation() {
    setIsLoading(true);
    setError("");
    try {
      chrome.runtime.sendMessage(
        {
          type: "TRANSLATE_TEXT",
          payload: {
            text: text,
            paragraph: text,
            srcLang,
            targetLang,
          },
        },
        (response) => {
          setIsLoading(false);
          if (response?.success) {
            setTranslation(response.data);
          } else {
            setError(response.error);
          }
        }
      );
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  useEffect(
    function () {
      if (!langsFetched) return;
      getTranslation();
    },
    [text, langsFetched]
  );

  {
    if (error)
      return (
        <div className="w-full pb-2 px-4">
          <ErrorComponent error={error} getTranslation={getTranslation} />
        </div>
      );
  }

  return (
    <div className="flex flex-col gap-4 px-2 py-2 font-medium">
      <p className="p-2 text-base bg-[var(--secondary)] rounded-md border-[var(--border)] border text-[var(--foreground)]">
        {text}
      </p>
      <div className={`${isLoading && "gradient-border"} rounded-md p-[2px]`}>
        <p
          className={`${
            isLoading && "font-bold text-base"
          } p-2 text-base bg-[var(--secondary)] rounded-md border-[var(--border)] border text-[var(--foreground)]`}
        >
          {isLoading
            ? "..."
            : translation?.translation || "Translation not available"}
        </p>
      </div>
    </div>
  );
}

export default SentencePopup;
