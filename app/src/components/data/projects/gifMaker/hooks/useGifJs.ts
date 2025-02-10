import {useCallback, useMemo, useRef, useState} from "react";
import GIF from "gif.js.optimized/dist/gif";
import {useNonEmptyConnectState} from "../../../../helper/useNonEmptyConnectState";
import {CanvasOptions, createNewCanvas} from "../helper/createNewCanvas";
import {RefHTMLImageElement} from "../../../../helper/types";

export type CanvasDrawFct = (
  canvas: HTMLCanvasElement,
  source: CanvasImageSource
) => void;

export interface GifJsConfig {
  width: number;
  height: number;
  animationFrames: number;
  quality: number;
  scale: number;
  gifs: string[];
  transparent: null | string;
}

const defaultGifJsConfig: GifJsConfig = {
  width: 100,
  height: 100,
  animationFrames: 25,
  quality: 1,
  scale: 4,
  transparent: null,
  gifs: [],
};

export const useGifJs = (propConfig?: Partial<GifJsConfig>) => {
  const config = Object.assign({}, defaultGifJsConfig, propConfig);
  const widthState = useState(config.width);
  const [width, ] = widthState;
  const heightState = useState(config.height);
  const [height, ] = heightState;
  const animationFramesState = useState(config.animationFrames);
  const [animationFrames, setAnimationFrames] = animationFramesState;
  const qualityState = useState(config.quality);
  const [quality, ] = qualityState;
  const scaleState = useState(config.scale);
  const transparentState = useState(config.transparent);
  const [transparent, ] = transparentState;

  const [frames, setFrames] = useState<HTMLCanvasElement[]>([]);
  const generatedGifsState = useNonEmptyConnectState<string>(config.gifs);
  const [generatedGifs, setGeneratedGifs] = generatedGifsState;

  const framesContainerRef = useRef<HTMLDivElement>(null);

  const [src, setSrc] = useState<RefHTMLImageElement>(null);
  const srcRef = useCallback((node:HTMLImageElement) => {
    if (node !== null) {
      setSrc(node);
    }
    return node;
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const timeLength = useMemo(
    () => frames.length / animationFrames,
    [frames, animationFrames]
  );

  const setFramesHandler = (canvas: HTMLCanvasElement) => {
    setFrames((prevFrames) => {
      const newFrames = [...prevFrames, canvas];
      setAnimationFrames(newFrames.length);
      return newFrames;
    });
  };
  const prepareNewCanvas = (
    ctxChanger: (canvas: HTMLCanvasElement) => void,
    options: Partial<CanvasOptions> = {}
  ) => {
    const canvas = createNewCanvas({
      width: options.width ? options.width : width,
      height: options.height ? options.height : height,
    });
    if (framesContainerRef.current !== null) {
      framesContainerRef.current.appendChild(canvas);
      ctxChanger(canvas);
      setFramesHandler(canvas);
    }

    return canvas;
  };

  const defaultDraw: CanvasDrawFct = (canvas, src) => {
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.drawImage(src, 0, 0, width, height);
    }
  };
  const addFrame =
    (canvasSource: CanvasImageSource) =>
      (draw = defaultDraw, options: Partial<CanvasOptions> = {}) => {
        prepareNewCanvas((canvas) => {
          draw(canvas, canvasSource);
          const ctx = canvas.getContext("2d");
          if (ctx !== null) {
            ctx.fill();
          }
        }, options);
      };
  const addImage =
    (src: string) =>
      (draw = defaultDraw, options: Partial<CanvasOptions> = {}) => {
        prepareNewCanvas((canvas) => {
          const img = new Image();
          img.onload = function () {
            draw(canvas, img);
            const ctx = canvas.getContext("2d");
            if (ctx !== null) {
              ctx.fill();
            }
          };
          img.src = src;
        }, options);
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
      const gifWidth = frames.reduce(
        (v, canvas) => Math.max(v, canvas.width),
        0
      );
      const gifHeight = frames.reduce(
        (v, canvas) => Math.max(v, canvas.height),
        0
      );

      const gif = new GIF({
        workers: 2,
        quality: quality,
        workerScript: "/lib/gif.worker.js",
        // debug: true,
        width: gifWidth,
        height: gifHeight,
        transparent: transparent,
      });

      setLoading(true);
      frames.forEach((frame) => {
        const ctx = frame.getContext("2d");
        if (ctx !== null) {
          gif.addFrame(ctx, {delay: (timeLength / frames.length) * 1000});
        }
      });

      gif.on("finished", (blob: Blob) => {
        // window.open(URL.createObjectURL(blob));
        setLoading(false);
        setGeneratedGifs([URL.createObjectURL(blob), ...generatedGifs]);
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
    scaleState,
    transparentState,
    timeLength,
    frames,
    frameCount: frames.length,
    addImage,
    addFrame,
    reset,
    render,
    generatedGifsState,
    framesContainerRef,
    src,
    srcRef,
    isLoading: loading,
  };
};
