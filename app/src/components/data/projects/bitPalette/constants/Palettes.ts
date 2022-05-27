export const PaletteColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#000000",
  "#FFFFFF",
];

export const BitPaletteSizes = [8 , 16 , 32 , 64] as const;
export type BitPaletteSizeType = (typeof BitPaletteSizes)[number];
