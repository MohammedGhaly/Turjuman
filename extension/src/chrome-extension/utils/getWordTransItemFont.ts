const transFontSizes = {
  7: "text-4xl",
  10: "text-3xl",
  15: "text-[1.3rem]",
  100: "text-lg",
};

function getWordTransItemFontSize(wordLength: number) {
  if (wordLength <= 7) return transFontSizes[7];
  if (wordLength <= 10) return transFontSizes[10];
  if (wordLength <= 15) return transFontSizes[15];
  return transFontSizes[100];
}

export default getWordTransItemFontSize;
