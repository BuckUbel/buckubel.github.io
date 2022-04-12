import React, {RefObject, useRef, useState} from "react";
import {StyledCompProps} from "../../../helper/types";
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
        startEditing={(thisRef: RefObject<HTMLImageElement>) => {
          if (editRef.current !== null) {
            const editCtx = editRef.current.getContext("2d");
            if (editCtx !== null && thisRef.current !== null) {
              editRef.current.width = thisRef.current.width;
              editRef.current.height = thisRef.current.height;
              editCtx.drawImage(
                thisRef.current,
                0,
                0,
                thisRef.current.width,
                thisRef.current.height
              );
            }
          }
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
        transparentState={transparentState}
        qualityState={qualityState}
      />
      {/*<GifMakerInfoContainer*/}
      {/*  onlyVisual={onlyVisual}*/}
      {/*  selectedRef={srcRef.current}*/}
      {/*  timeLength={timeLength}*/}
      {/*/>*/}
    </div>
  );
}

export default styled(GifMaker)`
  background: #333;
  display: flex;
  flex-wrap: wrap;
`;
