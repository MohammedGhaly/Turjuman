interface TabsProps {
  activeTab: "translation" | "definition" | "examples";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"translation" | "definition" | "examples">
  >;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="rounded-lg bg-[var(--secondary)] h-[45px] w-full flex justify-around text-[var(--foreground)] border-[var(--border)] border">
      <Tab
        handleClick={setActiveTab}
        title="translation"
        key="translation"
        active={activeTab === "translation"}
      />
      <Tab
        handleClick={setActiveTab}
        title="definition"
        key="definition"
        active={activeTab === "definition"}
      />
      <Tab
        handleClick={setActiveTab}
        title="examples"
        key="examples"
        active={activeTab === "examples"}
      />
    </div>
  );
}

interface TabProps {
  handleClick: React.Dispatch<
    React.SetStateAction<"translation" | "definition" | "examples">
  >;
  title: "translation" | "definition" | "examples";
  active: boolean;
}

function Tab({ title, active, handleClick }: TabProps) {
  return (
    <div
      className={`${
        active
          ? "bg-[var(--tab-fill)] text-[var(--active-tab-title)]"
          : "text-[var(--foreground)]"
      } ${
        !active ? "hover:bg-[var(--tab-hover)] " : ""
      } font-semibold cursor-pointer rounded-md capitalize my-auto py-[6px] px-[10px] transition-colors duration-200`}
      onClick={() => handleClick(title)}
    >
      {title}
    </div>
  );
}
export default Tabs;
