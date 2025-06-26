import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import FlippedCard from "./FlippedCard";
import { FlashCardType } from "@/types/FlashCard";

interface Props {
  flashCard: FlashCardType;
  z: number;
  onSwipe: () => void;
}
interface HiddenProps {
  word: string;
}

function FlashCard({ flashCard, onSwipe, z }: Props) {
  const [flipped, setFlipped] = useState(false);
  const controls = useAnimation();
  const isTop = z === 20;

  useEffect(() => {
    controls.start({
      x: z,
      y: z,
      opacity: 1,
      transition: { duration: 0.3 },
    });
  }, [z, controls]);

  const handleSwipe = async (dir: "left" | "right") => {
    await controls.start({ x: dir === "left" ? -600 : 600, opacity: 0 });
    onSwipe();
  };

  return (
    <motion.div
      className={`w-11/12 h-[86%] shadow-xl absolute rounded-2xl card-shadow overflow-y-scroll overflow-x-hidden scrollbar-hidden bg-[var(--outer-boxes-bg)] py-4 dark:border dark:border-[var(--flashcard-border)]`}
      style={{ zIndex: z, transition: "all", transitionDuration: "300ms" }}
      onClick={isTop ? () => setFlipped(true) : () => {}}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={
        flipped
          ? (_, info) => {
              if (info.offset.x > 0) {
                if (info.offset.x > 200) handleSwipe("right");
                else
                  controls.start({
                    x: z,
                    y: z,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  });
              } else if (info.offset.x < 0) {
                if (info.offset.x < -200) handleSwipe("left");
                else
                  controls.start({
                    x: z,
                    y: z,
                    opacity: 1,
                    transition: { duration: 0.3 },
                  });
              }
            }
          : () => {}
      }
      animate={controls}
    >
      {/* {isLoading && <Skeleton className="h-full w-full" />} */}
      {flipped ? (
        <FlippedCard trans={flashCard} />
      ) : (
        <Hidden word={flashCard.word} />
      )}
    </motion.div>
  );
}

export function Hidden({ word }: HiddenProps) {
  return (
    <div className="flex items-center justify-center h-full w-full rounded-2xl bg-[var(--outer-boxes-bg)]">
      <h2 className="flex justify-center items-center text-4xl font-bold bg-[var(--outer-boxes-bg)] capitalize">
        {word}
      </h2>
    </div>
  );
}

export default FlashCard;
