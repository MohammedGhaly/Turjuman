import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

function AiResponseLoader() {
  const [loadText, setLoadText] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoadText(loadText + 1);
    }, 700);
  });

  return (
    <div className="gradient-border p-[2px] w-2/5 rounded-lg">
      <div className="w-full bg-[var(--ai-msg-bg)] rounded-md p-3 flex">
        {Array.from({ length: 1 + (loadText % 3) }).map((_, index) => (
          <Dot key={index} />
        ))}
      </div>
    </div>
  );
}

export default AiResponseLoader;
