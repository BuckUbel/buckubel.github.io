declare module "*.md" {
  const value: string; // markdown is just a string
  export default value;
}

declare module "gif.js.optimized/dist/gif" {
  import EventEmitter from "events";

  export interface GIFEncoderOptions {
    workerScript: string; // default = 'gif.worker.js',
    workers: number; // default = 2,
    repeat: number; // default = 0, 0 = repeat forever, -1 = repeat once
    background: string; // default = #fff,
    quality: number; // default = 10, pixel sample interval, lower is better
    width: number | null; // default = null, size determined from first frame if possible
    height: number | null; // default = null
    transparent: string | null; // default = null
    debug: boolean; // default = false
  }

  export interface GIFEncoderFrameOptions {
    delay: number; // default = 500, ms
    copy: boolean; // default = false
  }

  export interface GIFEncoderTask {
    index: number;
    last: boolean;
    delay: GIFEncoderFrameOptions["delay"];
    transparent: GIFEncoderOptions["transparent"];
    width: GIFEncoderOptions["width"];
    height: GIFEncoderOptions["height"];
    quality: GIFEncoderOptions["quality"];
    dither: any; //?
    globalPalette: any; //?
    repeat: GIFEncoderOptions["repeat"];
    canTransfer: true;
  }

  export type GIFEncoderImage =
    | ImageData
    | CanvasRenderingContext2D
    | WebGLRenderingContext;

  declare class GIF extends EventEmitter {
    constructor(options: Partial<GIFEncoderOptions>): GIF;

    setOption(key: keyof GIFEncoderOptions, value: any): void;

    setOptions(option: Partial<GIFEncoderOptions>): void;

    addFrame(
      image: GIFEncoderImage | CanvasImageSource,
      options?: Partial<GIFEncoderFrameOptions>
    ): void;

    render(): void;

    abort(): void;

    // private ↓
    spawnWorkers(): number;

    frameFinished(frame: any, duplicate: boolean): void;

    finishRendering(): void;

    renderNextFrame(): void;

    getContextData(ctx: CanvasRenderingContext2D): ImageData["data"];

    getImageData(image: CanvasImageSource): ImageData["data"];

    getTask(frame: any): GIFEncoderTask;

    log(msg: any): void;
  }

  export default GIF;
}
