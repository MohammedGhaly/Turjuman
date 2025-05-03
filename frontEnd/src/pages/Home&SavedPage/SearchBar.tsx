import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full md:w-3/4">
      <input
        placeholder="search in your recent words"
        type="text"
        className="bg-[var(--searchbar-background)] rounded-md w-full p-[6px] px-3 border border-[var(--input-border)]"
      ></input>
      <div className="absolute inline-block right-2 top-[50%] translate-y-[-50%]">
        <Search color="var(--foreground)" />
      </div>
    </div>
  );
}

export default SearchBar;
