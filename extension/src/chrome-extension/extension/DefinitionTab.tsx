import { useState } from "react";

function DefinitionTab() {
  const [definition] = useState(
    "to put food into the mouth, chew it, and swallow it"
  );
  return (
    <div className=" bg-[var(--secondary)] rounded-lg h-auto py-1 border-[var(--border)] border">
      <p className="turjuman-scrollable overflow-y-scroll max-h-32 px-2 mx-1 py-1 ">
        {definition}
      </p>
    </div>
  );
}

export default DefinitionTab;
