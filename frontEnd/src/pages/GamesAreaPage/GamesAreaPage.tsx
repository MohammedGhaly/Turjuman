import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router";

function GamesAreaPage() {
  return (
    <motion.div
      key={"gamesAreaPageMotion"}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.1 }}
      className="flex-1 turjuman-scrollable overflow-y-hidden"
    >
      <Toaster />
      <Outlet />
      {/* <FlashCardsGame /> */}
    </motion.div>
  );
}

export default GamesAreaPage;
