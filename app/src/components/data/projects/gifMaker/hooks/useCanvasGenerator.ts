import { CanvasDrawFct } from "./useGifJs";
import { hexToRgba, uInt8ArrayToHex } from "../../../../helper/rgbToHex";
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

const WIDEST_COLOR_DIFF = 766;
const COLOR_4BIT0 = "#65ff00ff";
const COLOR_4BIT1 = "#e0f8cfff";
const COLOR_4BIT2 = "#86c06cff";
const COLOR_4BIT3 = "#071821ff";
const COLOR_4BIT_ARRAY = [COLOR_4BIT0, COLOR_4BIT1, COLOR_4BIT2, COLOR_4BIT3];

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

  const generate4Bit = (canvas: HTMLCanvasElement | null) => {
    if (canvas !== null) {
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        for (let x = 0; x < canvas.width; x += 1) {
          for (let y = 0; y < canvas.height; y += 1) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            let nearestColor = COLOR_4BIT0;
            let nearestDiff = WIDEST_COLOR_DIFF;
            COLOR_4BIT_ARRAY.forEach((color4Bit) => {
              const rgba = hexToRgba(color4Bit);
              if (rgba !== null) {
                let diff = 0;
                diff += pixel[0] - rgba.r;
                diff += pixel[1] - rgba.g;
                diff += pixel[2] - rgba.b;
                diff = Math.abs(diff);
                if (diff < nearestDiff) {
                  nearestDiff = diff;
                  nearestColor = color4Bit;
                }
              }
            });
            ctx.fillStyle = nearestColor;
            ctx.fillRect(x, y, 1, 1);
          }
        }
        setActionCount((prev) => prev + 1);
      }
    }
  };
  return {
    generateFullRotation,
    generateFullMarquee,
    generateScaled,
    generate4Bit,
  };
};
