const transFontSizes = {
  7: "text-4xl",
  11: "text-3xl lg:text-4xl",
  15: "text-[1.4rem] md:text-2xl lg:text-4xl",
  100: "text-xl md:text-2xl",
};

function getWordTransItemFontSize(wordLength: number) {
  if (wordLength <= 7) return transFontSizes[7];
  if (wordLength <= 11) return transFontSizes[11];
  if (wordLength <= 15) return transFontSizes[15];
  return transFontSizes[100];
}

export default getWordTransItemFontSize;
