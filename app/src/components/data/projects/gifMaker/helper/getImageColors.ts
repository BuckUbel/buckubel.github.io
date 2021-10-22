import { imgToCanvas } from "./imgToCanvas";
import { uInt8ArrayToHex } from "../../../../helper/rgbToHex";

export type ColorCountArray = { [color: string]: number };

export function getImageColors(img: HTMLImageElement): ColorCountArray {
  const canvas = imgToCanvas(img);
  const ctx = canvas.getContext("2d");
  const allColors: ColorCountArray = {};
  if (ctx !== null) {
    for (let x = 0; x < canvas.width; x += 1) {
      for (let y = 0; y < canvas.height; y += 1) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hexColor = uInt8ArrayToHex(pixel);
        allColors[hexColor] = (allColors[hexColor] ?? 0) + 1;
      }
    }
  }
  return allColors;
}
