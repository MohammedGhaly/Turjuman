const langToEmoji: Record<
  | "English"
  | "German"
  | "French"
  | "Spanish"
  | "Italian"
  | "Arabic"
  | "Japanese",
  string
> = {
  English: "🇬🇧",
  German: "🇩🇪",
  French: "🇫🇷",
  Spanish: "🇪🇸",
  Italian: "🇮🇹",
  Arabic: "🇸🇦",
  Japanese: "🇯🇵",
};

function getLangEmoji(language: keyof typeof langToEmoji): string {
  return langToEmoji[language];
}

export default getLangEmoji;
