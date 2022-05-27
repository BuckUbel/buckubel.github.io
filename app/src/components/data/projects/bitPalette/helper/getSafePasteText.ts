export function getSafePasteText(text: string, paletteSize: number) {
  if (!/^\d+$/.test(text)) return "";
  const segments = text.split("");
  return segments.map((num) => {
    if (Number(num) > paletteSize) {
      return "0";
    }
    return num;
  }).join("");
}
