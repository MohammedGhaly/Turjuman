const getLangFlag = (language: string): string => {
  const flags: Record<string, string> = {
    English: "https://flagcdn.com/128x96/gb.png",
    Arabic: "https://flagcdn.com/128x96/sa.png",
    Spanish: "https://flagcdn.com/128x96/es.png",
    Italian: "https://flagcdn.com/128x96/it.png",
    Japanese: "https://flagcdn.com/128x96/jp.png",
    German: "https://flagcdn.com/128x96/de.png",
    French: "https://flagcdn.com/128x96/fr.png",
  };

  return flags[language] || "https://example.com/flags/default.png";
};

export default getLangFlag;
