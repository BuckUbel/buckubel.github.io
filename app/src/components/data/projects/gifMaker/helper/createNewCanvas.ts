import { v4 as uuid } from "uuid";

export interface CanvasOptions {
  width: number;
  height: number;
}

export function createNewCanvas(options: CanvasOptions) {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas-" + uuid();
  canvas.width = options.width;
  canvas.height = options.height;
  return canvas;
}
