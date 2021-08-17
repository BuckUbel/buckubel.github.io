import React, { useRef, useState } from "react";
import GIF from "gif.js.optimized/dist/gif";
import image from "../../../../images/logo_transparent.png";
import { StyledCompProps } from "../../../helper/types";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

type CanvasDrawFct = (
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource
) => void;

interface GifMakerProps extends StyledCompProps {}

function GifMaker({ className }: GifMakerProps) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [rotationFrames, setRotationFrames] = useState(25);
  const [quality, setQuality] = useState(1);
  const [length, setLength] = useState(10);
  const framesRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLImageElement>(null);

  const [frames, setFrames] = useState<HTMLCanvasElement[]>([]);
  const [myGeneratedGif, setMyGeneratedGif] = useState<string | undefined>(
    undefined
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

    if (ref.current !== null && framesRef.current !== null) {
      framesRef.current.appendChild(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx !== null) {
        draw(ctx, ref.current);
        ctx.fill();
      }
      setFrames((prevFrames) => [...prevFrames, canvas]);
    }
  };
  const addFullRotation = () => {
    for (let i = 1; i < rotationFrames + 1; i++) {
      addImage((ctx, src) => {
        ctx.translate(width / 2, height / 2);
        ctx.rotate(((360 / rotationFrames) * i * Math.PI) / 180); // rotate by 90 degrees
        ctx.translate(width / -2, height / -2);
        ctx.drawImage(src, 0, 0, width, height);
      });
    }
  };
  const reset = () => {
    setMyGeneratedGif(undefined);
    setFrames((prevFrames) => {
      prevFrames.forEach((prevFrame) => prevFrame.remove());
      return [];
    });
  };

  const render = () => {
    const gif = new GIF({
      workers: 2,
      quality: quality,
      workerScript: "/lib/gif.worker.js",
      debug: true,
      width: width,
      height: height,
      // transparent: "#FFF",
    });

    frames.forEach((frame) => {
      const ctx = frame.getContext("2d");
      if (ctx !== null) {
        gif.addFrame(ctx, { delay: (length / frames.length) * 100 });
      }
    });

    gif.on("finished", function (blob: string) {
      // window.open(URL.createObjectURL(blob));
      setMyGeneratedGif(URL.createObjectURL(blob));
      console.log(myGeneratedGif);
      gif.abort();
    });
    gif.render();
  };
  console.log("Render", myGeneratedGif);
  console.log("Frames", frames);

  //TODO: Image upload
  //TODO: SVG's to gif (with cool rotate options)
  //TODO: Gif options setter with typescript ?
  // more cool function, like rotation
  // extend rotation with a minisizer, so the complete image is on each frame visible

  return (
    <div className={className}>
      <div>
        <div>
          <span>Breite</span>
          <input
            type={"number"}
            defaultValue={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Höhe</span>
          <input
            type={"number"}
            defaultValue={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Drehungswinkel (pro 1s)</span>
          <input
            type={"number"}
            defaultValue={rotationFrames}
            onChange={(e) => setRotationFrames(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <img
          id={"image-123"}
          alt={"main image"}
          src={image}
          ref={ref}
          style={{ width: width + "px", height: height + "px" }}
        />
      </div>
      <div>
        <button onClick={() => addImage()}>Add image</button>
        <button onClick={addFullRotation}>Add full rotation</button>
        <button onClick={reset}>Reset Gif</button>
        <button onClick={render}>Render Gif</button>
      </div>
      <div>
        <div>
          <span>Qualität</span>
          <input
            type={"number"}
            defaultValue={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Zeitlänge (in 100ms)</span>
          <input
            type={"number"}
            defaultValue={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
      </div>
      {!!myGeneratedGif && (
        <div>
          <img alt={"generated gif"} src={myGeneratedGif} />
        </div>
      )}
      <div>
        Canvas: <div ref={framesRef} />
      </div>
    </div>
  );
}

export default styled(GifMaker)`
  background: #333;

  img,
  canvas {
    border: 1px white solid;
  }
`;
