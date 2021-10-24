import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import image from "../../../../images/logo_transparent.png";
import { StyledCompProps } from "../../../helper/types";
import styled from "styled-components";
import { CanvasDrawFct, useGifJs } from "./hooks/useGifJs";
import { useCanvasGenerator } from "./hooks/useCanvasGenerator";
import { Color } from "../../../config/color";
import GifMakerInfoContainer from "./gifMakerContainer/GifMakerInfoContainer";
import BorderContainer from "../../../content/BorderContainer";
import GifMakerSettingsContainer from "./gifMakerContainer/GifMakerSettingsContainer";
import GifMakerSourceContainer from "./gifMakerContainer/GifMakerSourceContainer";
import GifMakerEditContainer from "./gifMakerContainer/GifMakerEditContainer";
import GifMakerResultContainer from "./gifMakerContainer/GifMakerResultContainer";
import GifMakerFramesContainer from "./gifMakerContainer/GifMakerFramesContainer";

interface GifMakerProps extends StyledCompProps {
  onlyVisual: boolean;
}

function GifMaker({ className, onlyVisual }: GifMakerProps) {
  const {
    widthState,
    heightState,
    animationFramesState,
    qualityState,
    scaleState,
    timeLength,
    addImage,
    addFrame,
    reset,
    render,
    generatedGifsState,
    framesContainerRef,
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

  const [editCounter, setEditCounter] = useState(0);
  const editRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (editRef.current !== null) {
      const editCtx = editRef.current.getContext("2d");
      if (editCtx !== null && srcRef.current !== null) {
        editRef.current.width = srcRef.current.width;
        editRef.current.height = srcRef.current.height;
        editCtx.drawImage(
          srcRef.current,
          0,
          0,
          srcRef.current.width,
          srcRef.current.height
        );
      }
    }
  }, [editCounter]);
  //TODO: Operations on uploaded images (execute operations on unzoomed images)
  //TODO: Select if you want to change the size of uploaded image, or you want to set on 0,0  of gif
  //TODO: Add image operations, to change position of image in gif on each frame (e.g. waterDrop)
  //TODO: SVG's to gif (with cool rotate options)
  //TODO: Gif options setter with typescript ?
  // more cool function, like rotation
  // extend rotation with a minisizer, so the complete image is on each frame visible
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
        currentSelectedImageState={currentSelectedImageState}
        uploadedImages={uploadedImages}
        widthState={widthState}
        heightState={heightState}
        startEditing={() => {
          setEditCounter((prev) => prev + 1);
        }}
        srcRef={srcRef}
      />
      <GifMakerSettingsContainer
        onlyVisual={onlyVisual}
        widthState={widthState}
        heightState={heightState}
        animationFramesState={animationFramesState}
        scaleState={scaleState}
        qualityState={qualityState}
      />
      <GifMakerInfoContainer
        onlyVisual={onlyVisual}
        selectedRef={srcRef.current}
        selectedImageString={currentSelectedImage}
        timeLength={timeLength}
      />
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
`;
