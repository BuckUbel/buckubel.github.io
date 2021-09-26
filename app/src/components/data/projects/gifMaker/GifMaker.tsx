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
    setGeneratedGifs,
    framesContainerRef,
    srcRef,
    frameCount,
    isLoading,
  } = useGifJs();

  const { generateFullMarquee, generateFullRotation, generateScaled } =
    useCanvasGenerator();
  const [showFrames, setShowFrames] = useState(false);
  const [scale, setScale] = useState(4);

  const [currentSelectedImage, setCurrentSelectedImage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const addToUploadedImages = (newSrc: string) => {
    setUploadedImages((prev) => {
      return [...prev, newSrc];
    });
  };
  const addAllUploadImagesToFrames = () => {
    uploadedImages.forEach((upSrc) => {
      addFrame(upSrc);
    });
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files.item(i);
        if (file !== null && file.type.startsWith("image")) {
          const reader = new FileReader();
          reader.onload = (progressEvent) => {
            if (progressEvent.target !== null) {
              const newSrc = progressEvent.target.result as string;

              const tempImg = new Image();
              tempImg.src = newSrc;
              tempImg.onload = function () {
                setWidth(tempImg.width);
                setHeight(tempImg.height);
                // TODO: Error Handling on different image sizes
              };

              console.log(reader, progressEvent, file);
              addToUploadedImages(newSrc);
              if (currentSelectedImage === "") {
                setCurrentSelectedImage(newSrc);
              }
            }
          };
          reader.readAsDataURL(file);
          console.log(e.target, uploadedImages);
        }
      }
    }
  };

  //TODO: Operations on uploaded images (execute operations on unzoomed images)
  //TODO: Select if you want to change the size of uploaded image, or you want to set on 0,0  of gif
  //TODO: Add image operations, to change position of image in gif on each frame (e.g. waterDrop)
  //TODO: SVG's to gif (with cool rotate options)
  //TODO: Gif options setter with typescript ?
  // more cool function, like rotation
  // extend rotation with a minisizer, so the complete image is on each frame visible
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
          <button onClick={() => addImage()}>
            Add current image to frames
          </button>
          <button onClick={() => addAllUploadImagesToFrames()}>
            Add images to frames
          </button>
          <input
            type={"file"}
            accept={"image/*"}
            onChange={handleImageUpload}
            multiple
          />
          <button
            onClick={generateFullRotation(addImage, {
              frameCount: animationFrames,
              width: width,
              height: height,
            })}
          >
            Add full rotation
          </button>
          <button
            onClick={generateScaled(addImage, {
              scale: scale,
              width: width,
              height: height,
            })}
          >
            Increase size
          </button>
          <button
            onClick={generateFullMarquee(addImage, {
              frameCount: animationFrames,
              width: width,
              height: height,
            })}
          >
            Add full marquee
          </button>
          <button onClick={reset}>Reset Frames</button>
          <button onClick={() => setGeneratedGifs([])}>Reset Gifs</button>
          <button onClick={render}>Render Gif</button>
        </div>
      </div>
      <div className={"border-container source-image-container"}>
        <h4>Images</h4>
        {currentSelectedImage === "" && <p>Kein Bild vorhanden!</p>}
        {currentSelectedImage !== "" && (
          <img
            id={"src-image"}
            alt={"src image"}
            className={"source-image"}
            src={currentSelectedImage}
            ref={srcRef}
            // style={{ width: width + "px", height: height + "px" }}
          />
        )}
        {uploadedImages.map((upSrc, index) => (
          <img
            key={upSrc + index}
            src={upSrc}
            onClick={() => setCurrentSelectedImage(upSrc)}
          />
        ))}
      </div>
      <div className={"border-container edit-image-container"}>
        <h4>Settings</h4>
        <div className={"edit-image-inner-container"}>
          <div>
            <span>Width</span>
            <input
              type={"number"}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <span>Height</span>
            <input
              type={"number"}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div>
            <span>Animation-FPS</span>
            <input
              type={"number"}
              value={animationFrames}
              onChange={(e) => setAnimationFrames(Number(e.target.value))}
            />
          </div>
          <div>
            <span>Skalierung</span>
            <input
              type={"number"}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
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
