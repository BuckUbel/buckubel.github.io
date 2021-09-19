import React, { ChangeEvent, useState } from "react";
import image from "../../../../images/logo_transparent.png";
import { StyledCompProps } from "../../../helper/types";
import styled from "styled-components";
import { useGifJs } from "./hooks/useGifJs";
import { useCanvasGenerator } from "./hooks/useCanvasGenerator";
import { Color } from "../../../config/color";

interface GifMakerProps extends StyledCompProps {}

function GifMaker({ className }: GifMakerProps) {
  const {
    widthState: [width, setWidth],
    heightState: [height, setHeight],
    animationFramesState: [animationFrames, setAnimationFrames],
    qualityState: [quality, setQuality],
    length,
    addImage,
    addFrame,
    reset,
    render,
    generatedGifs,
    framesContainerRef,
    srcRef,
    frameCount,
    isLoading,
  } = useGifJs();

  const { generateFullMarquee, generateFullRotation } =
    useCanvasGenerator(addImage);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const addUploadImage = (newSrc: string) => {
    setUploadedImages((prev) => {
      return [...prev, newSrc];
    });
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      console.log(e.target.files, e.target.files.length);
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files.item(i);
        if (file !== null) {
          const reader = new FileReader();
          // const { current } = uploadedImage;
          // console.log(current);
          // current.file = file;
          reader.onload = (progressEvent) => {
            if (progressEvent.target !== null) {
              const newSrc = progressEvent.target.result as string;
              // current.src = progressEvent.target.result as string;
              addUploadImage(newSrc);
              addFrame(newSrc);
              console.log(file, progressEvent.target.result);
            }
          };
          reader.readAsDataURL(file);
          console.log(e.target, uploadedImages);
        }
      }
    }
  };

  //TODO: Four sizer (you take each pixel and zoom it on 4 pixels -> 16x16 -> 64x64)
  //TODO: Operations on uploaded images (execute operations on unzoomed images)
  //TODO: Select if you want to change the size of uploaded image, or you want to set on 0,0  of gif
  // TODO: Add image operations, to change position of image in gif on each frame (e.g. waterDrop)
  //TODO: SVG's to gif (with cool rotate options)
  //TODO: Gif options setter with typescript ?
  // more cool function, like rotation
  // extend rotation with a minisizer, so the complete image is on each frame visible
  const [showFrames, setShowFrames] = useState(false);
  return (
    <div className={className}>
      <div className={"border-container canvas-container"}>
        <div className={"canvas-info-container"}>
          <h4 className={"canvas-info-frames"}>Frames: {frameCount}</h4>
          <button
            className={"canvas-info-show-frames-button"}
            onClick={() => setShowFrames((prev) => !prev)}
          >
            {showFrames ? "Hide" : "Show"} frames
          </button>
        </div>
        <div
          className={`canvas-inner-container ${
            showFrames ? "" : "hide-canvas-inner-container"
          }`}
          ref={framesContainerRef}
        />
      </div>
      <div className={"border-container generated-gif-container"}>
        <h4>Generated gifs</h4>
        {isLoading && <div>Berechnung erfolgt ...</div>}
        {generatedGifs.length > 0 && (
          <>
            {generatedGifs.map((gif) => (
              <a key={gif} href={gif} download={"Awesowme-GIF.gif"}>
                <img alt={"generated gif"} src={gif} />
              </a>
            ))}
          </>
        )}
      </div>
      <div className={"border-container generate-image-container"}>
        <h4>Edit & Generate</h4>
        <div className={"generate-image-inner-container"}>
          <button onClick={() => addImage()}>Add image</button>
          <input
            type={"file"}
            accept={"image/*"}
            onChange={handleImageUpload}
            multiple
          />
          <button
            onClick={generateFullRotation({
              frameCount: animationFrames,
              width: width,
              height: height,
            })}
          >
            Add full rotation
          </button>
          <button
            onClick={generateFullMarquee({
              frameCount: animationFrames,
              width: width,
              height: height,
            })}
          >
            Add full marquee
          </button>
          <button onClick={reset}>Reset Gif</button>
          <button onClick={render}>Render Gif</button>
        </div>
      </div>
      <div className={"border-container source-image-container"}>
        <h4>Images</h4>
        <img
          id={"src-image"}
          alt={"src image"}
          className={"source-image"}
          src={image}
          ref={srcRef}
          style={{ width: width + "px", height: height + "px" }}
        />
        {uploadedImages.map((upSrc, index) => (
          <img key={upSrc + index} src={upSrc} />
        ))}
      </div>
      <div className={"border-container edit-image-container"}>
        <h4>Settings</h4>
        <div className={"edit-image-inner-container"}>
          <div>
            <span>Width</span>
            <input
              type={"number"}
              defaultValue={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <span>Height</span>
            <input
              type={"number"}
              defaultValue={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div>
            <span>Animation-FPS</span>
            <input
              type={"number"}
              defaultValue={animationFrames}
              onChange={(e) => setAnimationFrames(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className={"border-container info-image-container"}>
        <h4>Info</h4>
        <div>
          <span>Quality</span>
          <input
            type={"number"}
            defaultValue={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Timelength: {length.toFixed(2)} Sekunden</span>
        </div>
      </div>
    </div>
  );
}

export default styled(GifMaker)`
  background: #333;
  display: flex;
  flex-wrap: wrap;

  img,
  canvas {
    border: 1px white solid;
  }

  .border-container {
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
    background: ${Color.PRIME_COLOR};
    color: ${Color.TEXT_PRIME_COLOR};

    width: calc(50% - 2px);
    display: inline-block;
    vertical-align: top;
    min-height: 150px;
    max-height: 350px;
    overflow: auto;
  }

  .generated-gif-container {
  }

  .canvas-container {
    .canvas-info-container {
      height: 50px;
      position: relative;

      .canvas-info-frames {
      }

      .canvas-info-show-frames-button {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .canvas-inner-container {
      max-height: 275px;
      overflow: auto;

      &.hide-canvas-inner-container {
        display: none;
      }
    }
  }

  .source-image-container {
    padding-top: 5px;

    .source-image {
      display: block;
      margin: 0 auto 20px auto;
    }
  }

  .edit-image-container {
    .edit-image-inner-container {
      margin: 0 10px;
    }
  }

  .generate-image-container {
    .generate-image-inner-container {
      margin: 0 10px;
    }
  }

  .info-image-container {
  }
`;
