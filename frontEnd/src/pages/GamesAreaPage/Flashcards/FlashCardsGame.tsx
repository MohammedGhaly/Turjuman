import Stack from "./Stack";
import EmptyFlashcards from "./EmptyFlashcards";
import { generateFlashcards } from "@/services/flashcardsClient";
import { useQuery } from "@tanstack/react-query";
import SpinnerPage from "@/components/SpinnerPage";

// const data: FlashCardType[] = [
//   {
//     id: "68251c4629236f03bed3e5fa",
//     isFavorite: false,
//     word: "Truncate",
//     translation: "اقتصِر",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition: "To shorten something by cutting off the end.",
//     synonymsSrc: ["shorten", "abbreviate", "cut short", "curtail", "reduce"],
//     synonymsTarget: ["اختصر", "قصر", "أزال الجزء الأخير", "قطع", "حذف"],
//     examples: ["example 1", "example 2", "example 3"],
//   },
//   {
//     id: "682210f7f642fec71647e288",
//     isFavorite: false,
//     word: "Book",
//     translation: "كتاب",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition: "A written or printed work consisting of pages bound together.",
//     synonymsSrc: ["volume", "tome", "text", "publication", "manuscript"],
//     synonymsTarget: ["مجلد", "مصنف", "مؤلف", "رسالة", "سفر"],
//     examples: ["example 1", "example 2", "example 3"],
//   },
//   {
//     id: "6821491f0c2904738653661d",
//     isFavorite: true,
//     word: "orange",
//     translation: "برتقال",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition:
//       "A round fruit with a reddish-yellow or deep orange rind and a juicy pulp that is often sweet.",
//     synonymsSrc: ["citrus", "tangerine", "mandarin", "fruit", "gold"],
//     synonymsTarget: [
//       "برتقالة",
//       "نارنج",
//       "يوسفي",
//       "شمندر (في بعض اللهجات)",
//       "برتقالي (صفة)",
//     ],
//     examples: ["example 1", "example 2", "example 3"],
//   },
//   {
//     id: "68251c4629236f03bed3e5fs",
//     isFavorite: false,
//     word: "Truncate",
//     translation: "اقتصِر",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition: "To shorten something by cutting off the end.",
//     synonymsSrc: ["shorten", "abbreviate", "cut short", "curtail", "reduce"],
//     synonymsTarget: ["اختصر", "قصر", "أزال الجزء الأخير", "قطع", "حذف"],
//     examples: ["example 1", "example 2", "example 3"],
//   },
//   {
//     id: "682210f7f642fec7f647e288",
//     isFavorite: false,
//     word: "Book",
//     translation: "كتاب",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition: "A written or printed work consisting of pages bound together.",
//     synonymsSrc: ["volume", "tome", "text", "publication", "manuscript"],
//     synonymsTarget: ["مجلد", "مصنف", "مؤلف", "رسالة", "سفر"],
//     examples: ["example 1", "example 2", "example 3"],
//   },
//   {
//     id: "6821491f0c2a04738653661d",
//     isFavorite: true,
//     word: "orange",
//     translation: "برتقال",
//     srcLang: SupportedLanguageEnum.English,
//     targetLang: SupportedLanguageEnum.Arabic,
//     definition:
//       "A round fruit with a reddish-yellow or deep orange rind and a juicy pulp that is often sweet.",
//     synonymsSrc: ["citrus", "tangerine", "mandarin", "fruit", "gold"],
//     synonymsTarget: [
//       "برتقالة",
//       "نارنج",
//       "يوسفي",
//       "شمندر (في بعض اللهجات)",
//       "برتقالي (صفة)",
//     ],
//     examples: ["example 1", "example 2", "example 3"],
//   },
// ];

function FlashCardsGame() {
  const {
    data: flashCards,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`flashCards`],
    queryFn: generateFlashcards,
    staleTime: 3600000,
  });

  // const flashCards = data;

  return (
    <div className=" w-full h-full overflow-hidden">
      {isLoading && <SpinnerPage />}
      {error && <p>{error.message}</p>}
      {!isLoading && flashCards && flashCards.length === 0 && (
        <EmptyFlashcards />
      )}
      {flashCards && !isLoading && flashCards.length > 0 && (
        <Stack flashCards={flashCards} />
      )}
    </div>
  );
}

export default FlashCardsGame;
