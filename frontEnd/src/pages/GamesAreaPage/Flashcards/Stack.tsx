import { FlashCardType } from "@/types/FlashCard";
import FlashCard from "./FlashCard";
import { useState } from "react";
import FinishedFlashcards from "./FinishedFlashcards";

interface Props {
  flashCards: FlashCardType[];
}

function Stack({ flashCards }: Props) {
  const [current, setCurrent] = useState(0);
  const handleSwipe = () => {
    setCurrent((c) => c + 1);
  };

  if (current - flashCards.length >= 0) return <FinishedFlashcards />;
  return (
    <div className="relative justify-center items-center h-full pl-2 pr-2 py-5 md:p-10">
      {flashCards && flashCards[current + 2] && (
        <FlashCard
          flashCard={flashCards[current + 2]}
          onSwipe={handleSwipe}
          key={current + 2}
          z={0}
        />
      )}
      {flashCards && flashCards[current + 1] && (
        <FlashCard
          flashCard={flashCards[current + 1]}
          onSwipe={handleSwipe}
          key={current + 1}
          z={10}
        />
      )}
      {flashCards && flashCards[current] && (
        <FlashCard
          flashCard={flashCards[current]}
          onSwipe={handleSwipe}
          key={current}
          z={20}
        />
      )}
    </div>
  );
}

export default Stack;
