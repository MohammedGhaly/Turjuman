import Definition from "./Definition";
import WordBar from "./WordBar";
import Synonyms from "./Synonyms";
import Examples from "./Examples";
import FlashCardActions from "./FlashCardActions";
import { FlashCardType } from "@/types/FlashCard";

interface Props {
  trans: FlashCardType;
  onAction: (level: string) => void;
}

function FlippedCard({
  trans: {
    word,
    examples,
    translation,
    synonymsSrc,
    synonymsTarget,
    definition,
    isFavorite,
    id,
    srcLang,
  },
  onAction,
}: Props) {
  return (
    <div className="h-full w-full px-4 flex flex-col justify-between gap-3 rounded-2xl">
      <div className="flex flex-col gap-2">
        {translation && (
          <WordBar
            id={id}
            isFavorite={isFavorite || false}
            original={word}
            srcLang={srcLang}
            key={id}
            translation={translation}
          />
        )}
      </div>

      {synonymsSrc && synonymsTarget && (
        <Synonyms
          synonymsSource={synonymsSrc}
          synonymsTarget={synonymsTarget}
          key={"synonyms" + `${id}`}
        />
      )}
      {definition && <Definition definition={definition} />}
      {examples && <Examples examples={examples?.slice(0, 2)} lang={srcLang} />}
      <div className="pb-4">
        <FlashCardActions onAction={onAction} />
      </div>
    </div>
  );
}

export default FlippedCard;
