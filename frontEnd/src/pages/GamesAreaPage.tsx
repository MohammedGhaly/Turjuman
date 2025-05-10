import { motion } from "framer-motion";

function GamesAreaPage() {
  return (
    <motion.div
      key={"gamesAreaPageMotion"}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.1 }}
      className="flex-1 border-t border-t-[var(--box-border)] turjuman-scrollable"
    >
      Flashcards game
    </motion.div>
  );
}

export default GamesAreaPage;
