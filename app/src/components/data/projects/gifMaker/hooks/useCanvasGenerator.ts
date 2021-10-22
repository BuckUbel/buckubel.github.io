import { CanvasDrawFct } from "./useGifJs";
import { uInt8ArrayToHex } from "../../../../helper/rgbToHex";
import { CanvasOptions, createNewCanvas } from "../helper/createNewCanvas";
import { useState } from "react";

export interface CanvasTransformConfig {
  width: number;
  height: number;
}

export interface AnimationCanvasTransformConfig extends CanvasTransformConfig {
  frameCount: number;
}

export interface SizerCanvasTransformConfig extends CanvasTransformConfig {
  scale?: number;
}

export const useCanvasGenerator = () => {
  const [, setActionCount] = useState(0);
  const generateFullRotation =
    (
      addImage: (draw: CanvasDrawFct) => void,
      config: AnimationCanvasTransformConfig
    ) =>
    () => {
      const { frameCount, width, height } = config;
      for (let i = 1; i < frameCount + 1; i++) {
        addImage((canvas, src) => {
          const ctx = canvas.getContext("2d");
          if (ctx !== null) {
            ctx.translate(width / 2, height / 2);
            ctx.rotate(((360 / frameCount) * i * Math.PI) / 180); // rotate by 90 degrees
            ctx.translate(width / -2, height / -2);
            ctx.drawImage(src, 0, 0, width, height);
          }
        });
      }
      setActionCount((prev) => prev + 1);
    };

  const generateFullMarquee =
    (
      addImage: (draw: CanvasDrawFct) => void,
      config: AnimationCanvasTransformConfig
    ) =>
    () => {
      const { frameCount, width, height } = config;
      for (let i = 1; i < frameCount + 1; i++) {
        addImage((canvas, src) => {
          const ctx = canvas.getContext("2d");
          if (ctx !== null) {
            ctx.translate(width * -1 + ((2 * width) / frameCount) * i, 0);
            ctx.drawImage(src, 0, 0, width, height);
          }
        });
      }
      setActionCount((prev) => prev + 1);
    };

  const generateScaled =
    (
      addImage: (draw: CanvasDrawFct, options: CanvasOptions) => void,
      config: SizerCanvasTransformConfig
    ) =>
    () => {
      const { scale = 2, width, height } = config;
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      addImage(
        (canvas: HTMLCanvasElement, src) => {
          const newCanvas = createNewCanvas({ width: width, height: height });
          const tempCtx = newCanvas.getContext("2d");
          if (tempCtx !== null) {
            tempCtx.drawImage(src, 0, 0, width, height);

            const ctx = canvas.getContext("2d");
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;
            if (ctx !== null) {
              for (let x = 0; x < scaledWidth; x += 1) {
                for (let y = 0; y < scaledHeight; y += 1) {
                  const pixel = tempCtx.getImageData(x, y, 1, 1).data;
                  ctx.fillStyle = uInt8ArrayToHex(pixel);
                  ctx.fillRect(x * scale, y * scale, scale, scale);
                }
              }
            }
          }
        },
        {
          width: scaledWidth,
          height: scaledHeight,
        }
      );
      setActionCount((prev) => prev + 1);
    };
  return {
    generateFullRotation,
    generateFullMarquee,
    generateScaled,
  };
};
