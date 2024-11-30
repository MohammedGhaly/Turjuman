import { Search } from "lucide-react";

function InputBar() {
  return (
    <div className="input-div flex gap-4 text-[var(--foreground)] font-semibold">
      <div className="relative">
        <input
          className="h-[30px] w-[260px] bg-[var(--secondary)] rounded-md pl-3 focus:outline-none border-[var(--border)] focus:border-[var(--accent)] focus:border-2 border"
          value="Eat"
        />
        <div className="absolute inline-block right-2 top-[2px]">
          <Search color="var(--switch-off)" />
        </div>
      </div>
      <select className="h-[30px] flex-1 bg-[var(--secondary)] rounded-md px-1 focus:outline-none border-[var(--border)] border focus:border-[var(--accent)] focus:border-2">
        <option>En</option>
        <option>Sp</option>
        <option>De</option>
        <option>Fr</option>
        <option>It</option>
        <option>Jp</option>
      </select>
    </div>
  );
}

export default InputBar;
