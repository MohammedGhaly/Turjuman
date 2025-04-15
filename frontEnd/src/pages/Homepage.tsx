import SearchBar from "../components/Home/SearchBar";
import WordTranslationItem from "../components/Home/WordTranslationItem";

function Homepage() {
  return (
    <div className="flex-1 border-t border-t-[var(--box-border)]">
      <div className="mt-4 mb-4 px-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 my-4 px-4">
        <WordTranslationItem />
        <WordTranslationItem />
        <WordTranslationItem />
        <WordTranslationItem />
      </div>
    </div>
  );
}

export default Homepage;
