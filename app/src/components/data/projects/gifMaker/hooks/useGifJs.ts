import { useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import GIF from "gif.js.optimized/dist/gif";
import { useNonEmptyConnectState } from "../../../../helper/useNonEmptyConnectState";

export type CanvasDrawFct = (
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource
) => void;

export interface GifJsConfig {
  width: number;
  height: number;
  animationFrames: number;
  quality: number;
  gifs: string[];
}

const defaultGifJsConfig: GifJsConfig = {
  width: 100,
  height: 100,
  animationFrames: 25,
  quality: 1,
  gifs: [],
};

export const useGifJs = (propConfig?: Partial<GifJsConfig>) => {
  const config = Object.assign({}, defaultGifJsConfig, propConfig);
  const widthState = useState(config.width);
  const [width, setWidth] = widthState;
  const heightState = useState(config.height);
  const [height, setHeight] = heightState;
  const animationFramesState = useState(config.animationFrames);
  const [animationFrames, setAnimationFrames] = animationFramesState;
  const qualityState = useState(config.quality);
  const [quality, setQuality] = qualityState;
  const [frames, setFrames] = useState<HTMLCanvasElement[]>([]);
  const [generatedGifs, setGeneratedGifs] = useNonEmptyConnectState<string>(
    config.gifs
  );

  const framesContainerRef = useRef<HTMLDivElement>(null);
  const srcRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const length = useMemo(
    () => frames.length / animationFrames,
    [frames, animationFrames]
  );

  const addImage = (
    draw: CanvasDrawFct = (ctx, src) => {
      ctx.drawImage(src, 0, 0, width, height);
    }
  ) => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-" + uuid();
    canvas.width = width; //specify width of your canvas
    canvas.height = height; //specify height of your canvas

    if (srcRef.current !== null && framesContainerRef.current !== null) {
      framesContainerRef.current.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        draw(ctx, srcRef.current);
        ctx.fill();
      }
      setFrames((prevFrames) => [...prevFrames, canvas]);
    }
  };

  const addFrame = (
    src: string,
    draw: CanvasDrawFct = (ctx, src) => {
      ctx.drawImage(src, 0, 0, width, height);
    }
  ) => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-" + uuid();
    canvas.width = width; //specify width of your canvas
    canvas.height = height; //specify height of your canvas

    if (srcRef.current !== null && framesContainerRef.current !== null) {
      framesContainerRef.current.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        const img = new Image();
        img.onload = function () {
          draw(ctx, img);
          ctx.fill();
        };
        console.log(src);
        img.src = src;
      }
      setFrames((prevFrames) => [...prevFrames, canvas]);
    }
  };

  const reset = () => {
    // setGeneratedGif(undefined);
    setLoading(false);
    setFrames((prevFrames) => {
      prevFrames.forEach((prevFrame) => prevFrame.remove());
      return [];
    });
  };

  const render = () => {
    if (frames.length > 0) {
      const gif = new GIF({
        workers: 2,
        quality: quality,
        workerScript: "/lib/gif.worker.js",
        // debug: true,
        width: width,
        height: height,
        transparent: "#000",
      });

      setLoading(true);
      frames.forEach((frame, index) => {
        const ctx = frame.getContext("2d");
        if (ctx !== null) {
          gif.addFrame(ctx, { delay: (length / frames.length) * 1000 });
        }
      });

      gif.on("finished", (blob: string) => {
        // window.open(URL.createObjectURL(blob));
        setLoading(false);
        setGeneratedGifs([...generatedGifs, URL.createObjectURL(blob)]);
        gif.abort();
      });
      gif.render();
    }
  };

  return {
    widthState,
    heightState,
    animationFramesState,
    qualityState,
    length,
    frames,
    frameCount: frames.length,
    addImage,
    addFrame,
    reset,
    render,
    generatedGifs,
    framesContainerRef,
    srcRef,
    isLoading: loading,
  };
};
