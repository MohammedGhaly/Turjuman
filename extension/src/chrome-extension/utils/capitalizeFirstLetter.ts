export function capitalizeFirstLetter(text: string | undefined) {
  if (text) return text[0].toUpperCase() + text.slice(1);
  return undefined;
}
