import { CanvasDrawFct } from "./useGifJs";

export interface CanvasTransformConfig {
  frameCount: number;
  width: number;
  height: number;
}

export const useCanvasGenerator = () => {
  const generateFullRotation =
    (addImage: (draw: CanvasDrawFct) => void, config: CanvasTransformConfig) =>
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
    (addImage: (draw: CanvasDrawFct) => void, config: CanvasTransformConfig) =>
    () => {
      const { frameCount, width, height } = config;
      for (let i = 1; i < frameCount + 1; i++) {
        addImage((ctx, src) => {
          ctx.translate(width * -1 + ((2 * width) / frameCount) * i, 0);
          ctx.drawImage(src, 0, 0, width, height);
        });
      }
    };

  return {
    generateFullRotation,
    generateFullMarquee,
  };
};
