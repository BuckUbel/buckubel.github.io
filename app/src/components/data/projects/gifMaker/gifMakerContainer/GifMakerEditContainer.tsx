import React from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../../helper/types";
import { CanvasDrawFct } from "../hooks/useGifJs";
import BorderContainer from "../../../../content/BorderContainer";
import { useCanvasGenerator } from "../hooks/useCanvasGenerator";
import TextButton from "../TextButton";
import {
  faCaretSquareRight,
  faChessBoard,
  faMinus,
  faPlus,
  faSave,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface GifMakerEditContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  addImage: (src: string) => () => void;
  addToUploadedImages: (newSrc: string) => () => void;
  currentSelectedImage: string;
  width: number;
  height: number;
  scale: number;
  animationFrames: number;

  isEditing: boolean;
  resetEditing: () => void;
  editRef: React.RefObject<HTMLCanvasElement>;
}

function GifMakerEditContainer({
  className,
  onlyVisual,
  addImage,
  addToUploadedImages,
  currentSelectedImage,
  width,
  height,
  scale,
  animationFrames,
  isEditing,
  resetEditing,
  editRef,
}: GifMakerEditContainerProps) {
  const {
    generateFullMarquee,
    generateFullRotation,
    generateScaled,
    generate4Bit,
  } = useCanvasGenerator();

  const scaleFct = (scaleToUse: number) =>
    generateScaled(
      (draw: CanvasDrawFct, options) => {
        if (editRef.current !== null) {
          const ctx = editRef.current.getContext("2d");
          if (ctx !== null) {
            draw(editRef.current, editRef.current);
            ctx.fill();
          }
        }
      },
      {
        scale: scaleToUse,
        width: editRef.current?.width ?? width,
        height: editRef.current?.height ?? height,
      }
    );

  return (
    <BorderContainer extraClassName={className}>
      <h4>Edit & Generate</h4>
      <TextButton
        content={"Save edit"}
        disabled={!isEditing}
        icons={[faSave]}
        onClick={() => {
          if (editRef.current !== null) {
            addToUploadedImages(editRef.current.toDataURL("image/jpeg", 1.0));
          }
        }}
      />
      <TextButton
        content={"Reset Edit Frame"}
        disabled={!isEditing}
        icons={[faTrash]}
        onClick={resetEditing}
      />
      <div className={"edit-image-inner-container"}>
        <p className={isEditing ? "hide-gif-maker-edit-element" : ""}>
          Bearbeitung pausiert!
        </p>
        <canvas
          id={"edit-image"}
          className={
            "edit-canvas " + (isEditing ? "" : "hide-gif-maker-edit-element")
          }
          ref={editRef}
        />
      </div>
      <TextButton
        icons={[faPlus]}
        disabled={!isEditing}
        onClick={scaleFct(scale)}
      />
      <TextButton
        content={"4 bit"}
        disabled={!isEditing}
        icons={[faChessBoard]}
        onClick={() => generate4Bit(editRef.current)}
      />
      <TextButton
        disabled={!isEditing}
        icons={[faMinus]}
        onClick={scaleFct(1 - 1 / scale)}
      />

      <hr />
      <div className={"generate-image-inner-container"}>
        <TextButton
          content={"Add rotation"}
          disabled={!currentSelectedImage}
          icons={[faSync]}
          onClick={generateFullRotation(addImage(currentSelectedImage), {
            frameCount: animationFrames,
            width: width,
            height: height,
          })}
        />
        <TextButton
          content={"Add marque"}
          disabled={!currentSelectedImage}
          icons={[faCaretSquareRight]}
          onClick={generateFullMarquee(addImage(currentSelectedImage), {
            frameCount: animationFrames,
            width: width,
            height: height,
          })}
        />
      </div>
    </BorderContainer>
  );
}

export default styled(GifMakerEditContainer)`
  .edit-image-inner-container {
    margin: 10px;

    .hide-gif-maker-edit-element {
      display: none;
    }
  }

  .generate-image-inner-container {
    margin: 10px;
  }
`;
