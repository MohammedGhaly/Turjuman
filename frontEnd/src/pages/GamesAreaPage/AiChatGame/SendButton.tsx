import { useTheme } from "@/contexts/ThemeProvider";
import { ArrowUp } from "lucide-react";

interface Props {
  handleSend: () => void;
}

export default function SendButton({ handleSend }: Props) {
  const { theme } = useTheme();

  return (
    <button
      onClick={handleSend}
      className={`p-2 text-white rounded ml-2 ai-send-btn-gradient-${theme}`}
    >
      <ArrowUp />
    </button>
  );
}
