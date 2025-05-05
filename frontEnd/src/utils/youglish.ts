export default function openYouglish(word: string, lang: string) {
  window.open(`https://youglish.com/pronounce/${word}/${lang.toLowerCase()}`);
}
