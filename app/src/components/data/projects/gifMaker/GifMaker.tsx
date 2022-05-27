import React, {useRef, useState} from "react";
import {RefHTMLImageElement, StyledCompProps} from "../../../helper/types";
import styled from "styled-components";
import {useGifJs} from "./hooks/useGifJs";
import GifMakerSettingsContainer from "./gifMakerContainer/GifMakerSettingsContainer";
import GifMakerSourceContainer from "./gifMakerContainer/GifMakerSourceContainer";
import GifMakerEditContainer from "./gifMakerContainer/GifMakerEditContainer";
import GifMakerResultContainer from "./gifMakerContainer/GifMakerResultContainer";
import GifMakerFramesContainer from "./gifMakerContainer/GifMakerFramesContainer";
import GifMakerInfoContainer from "./gifMakerContainer/GifMakerInfoContainer";

interface GifMakerProps extends StyledCompProps {
  onlyVisual: boolean;
}

function GifMaker({className, onlyVisual}: GifMakerProps) {
  const {
    widthState,
    heightState,
    animationFramesState,
    qualityState,
    scaleState,
    transparentState,
    timeLength,
    addImage,
    addFrame,
    reset,
    render,
    generatedGifsState,
    framesContainerRef,
    src,
    srcRef,
    frameCount,
    isLoading,
  } = useGifJs();

  const [width] = widthState;
  const [height] = heightState;
  const [animationFrames] = animationFramesState;
  const [scale] = scaleState;

  const currentSelectedImageState = useState("");
  const [currentSelectedImage, setCurrentSelectedImage] =
    currentSelectedImageState;

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const addToUploadedImages = (newSrc: string) => {
    setUploadedImages((prev) => {
      return [...prev, newSrc];
    });
    setCurrentSelectedImage(newSrc);
  };
  const removeFromUploadedImages = (oldSrc: string) => {
    setUploadedImages((prev) => {
      const newUploadedImages = prev.filter((img) => img !== oldSrc);
      if (oldSrc === currentSelectedImage) {
        setCurrentSelectedImage(newUploadedImages[0] ?? "");
      }
      return newUploadedImages;
    });
  };

  const [editCounter, setEditCounter] = useState(0);
  const editRef = useRef<HTMLCanvasElement>(null);

  //TODO: Operations on uploaded images (execute operations on unzoomed images)
  //TODO: Select if you want to change the size of uploaded image, or you want to set on 0,0  of gif
  //TODO: Add image operations, to change position of image in gif on each frame (e.g. waterDrop)
  //TODO: SVG's to gif (with cool rotate options)
  //TODO: Gif options setter with typescript ?
  // more cool function, like rotation
  // extend rotation with a minisizer, so the complete image is on each frame visible
  // TODO: Color change -> select a color and change all pixels of this to another color
  // TODO: Anti-GifMaker https://www.npmjs.com/package/gif-to-png https://github.com/benwiley4000/gif-frames

  return (
    <div className={className}>
      <GifMakerFramesContainer
        onlyVisual={onlyVisual}
        frameCount={frameCount}
        reset={reset}
        framesContainerRef={framesContainerRef}
      />
      <GifMakerResultContainer
        onlyVisual={onlyVisual}
        render={render}
        isLoading={isLoading}
        generatedGifsState={generatedGifsState}
      />
      <GifMakerEditContainer
        onlyVisual={onlyVisual}
        addImage={addImage}
        addToUploadedImages={addToUploadedImages}
        currentSelectedImage={currentSelectedImage}
        width={width}
        height={height}
        scale={scale}
        animationFrames={animationFrames}
        isEditing={editCounter !== 0}
        resetEditing={() => {
          setEditCounter(0);
        }}
        editRef={editRef}
      />
      <GifMakerSourceContainer
        onlyVisual={onlyVisual}
        addImage={addImage}
        addToUploadedImages={addToUploadedImages}
        removeFromUploadedImages={removeFromUploadedImages}
        currentSelectedImageState={currentSelectedImageState}
        uploadedImages={uploadedImages}
        widthState={widthState}
        heightState={heightState}
        startEditing={(imgElement: RefHTMLImageElement) => {
          if (editRef.current !== null) {
            const editCtx = editRef.current.getContext("2d");
            if (editCtx !== null && !!imgElement) {
              editRef.current.width = imgElement.width;
              editRef.current.height = imgElement.height;
              editCtx.drawImage(
                imgElement,
                0,
                0,
                imgElement.width,
                imgElement.height
              );
            }
          }
          setEditCounter((prev) => prev + 1);
        }}
        src={src}
        srcRef={srcRef}
      />
      <GifMakerSettingsContainer
        onlyVisual={onlyVisual}
        widthState={widthState}
        heightState={heightState}
        animationFramesState={animationFramesState}
        scaleState={scaleState}
        transparentState={transparentState}
        qualityState={qualityState}
      />
      <GifMakerInfoContainer
        onlyVisual={onlyVisual}
        selectedRef={src}
        currentSelectedImage={currentSelectedImage}
        timeLength={timeLength}
      />
    </div>
  );
}

export default styled(GifMaker)`
  background: #333;
  display: flex;
  flex-wrap: wrap;
`;
