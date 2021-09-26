import { CanvasDrawFct, CanvasOptions } from "./useGifJs";
import { rgbToHex } from "../../../../helper/rgbToHex";
import { v4 as uuid } from "uuid";

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
  const generateFullRotation =
    (
      addImage: (draw: CanvasDrawFct) => void,
      config: AnimationCanvasTransformConfig
    ) =>
    () => {
      const { frameCount, width, height } = config;
      for (let i = 1; i < frameCount + 1; i++) {
        addImage((ctx, src) => {
          ctx.translate(width / 2, height / 2);
          ctx.rotate(((360 / frameCount) * i * Math.PI) / 180); // rotate by 90 degrees
          ctx.translate(width / -2, height / -2);
          ctx.drawImage(src, 0, 0, width, height);
        });
      }
    };

  const generateFullMarquee =
    (
      addImage: (draw: CanvasDrawFct) => void,
      config: AnimationCanvasTransformConfig
    ) =>
    () => {
      const { frameCount, width, height } = config;
      for (let i = 1; i < frameCount + 1; i++) {
        addImage((ctx, src) => {
          ctx.translate(width * -1 + ((2 * width) / frameCount) * i, 0);
          ctx.drawImage(src, 0, 0, width, height);
        });
      }
    };

  const generateScaled =
    (
      addImage: (draw: CanvasDrawFct, options?: Partial<CanvasOptions>) => void,
      config: SizerCanvasTransformConfig
    ) =>
    () => {
      const { scale = 2, width, height } = config;
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      addImage(
        (ctx, src) => {
          const canvas = document.createElement("canvas");
          canvas.id = "canvas-" + uuid();
          canvas.width = width;
          canvas.height = height;
          const tempCtx = canvas.getContext("2d");
          if (tempCtx !== null) {
            tempCtx.drawImage(src, 0, 0, width, height);

            for (let x = 0; x < scaledWidth; x += 1) {
              for (let y = 0; y < scaledHeight; y += 1) {
                const p = tempCtx.getImageData(x, y, 1, 1).data;
                ctx.fillStyle = rgbToHex(p[0], p[1], p[2]);
                ctx.fillRect(x * scale, y * scale, scale, scale);
              }
            }
          }
        },
        {
          width: scaledWidth,
          height: scaledHeight,
        }
      );
    };
  return {
    generateFullRotation,
    generateFullMarquee,
    generateScaled,
  };
};
