import capitalize from "@/utils/capitalize";
import AiTranslationIcon from "@/components/AiTranslationIcon";

interface Props {
  translation: string;
}

function AiTranslation({ translation }: Props) {
  return (
    <div className="flex justify-between w-full mb-1">
      <div></div>
      <div className=" flex gap-2 items-center justify-between">
        <span className="text-2xl md:text-4xl font-bold">
          {translation ? capitalize(translation) : ""}
        </span>
        <span>
          <AiTranslationIcon />
        </span>
      </div>
    </div>
  );
}

export default AiTranslation;
