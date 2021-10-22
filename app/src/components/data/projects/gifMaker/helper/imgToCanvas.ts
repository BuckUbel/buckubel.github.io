import { createNewCanvas } from "./createNewCanvas";

export function imgToCanvas(img: HTMLImageElement) {
  const canvas = createNewCanvas({
    width: img.width,
    height: img.height,
  });
  const ctx = canvas.getContext("2d");
  if (ctx !== null) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.fill();
  }
  return canvas;
}
