import React from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../../helper/types";
import { CanvasDrawFct } from "../hooks/useGifJs";
import BorderContainer from "../../../../content/BorderContainer";
import { useCanvasGenerator } from "../hooks/useCanvasGenerator";

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

  return (
    <BorderContainer extraClassName={className}>
      <h4>Edit & Generate</h4>
      <button
        onClick={() => {
          if (editRef.current !== null) {
            addToUploadedImages(editRef.current.toDataURL("image/jpeg", 1.0));
          }
        }}
      >
        Save edit
      </button>
      <button onClick={resetEditing}>Reset Edit Frame</button>

      <div className={"edit-image-inner-container"}>
        {!isEditing && <p>Bearbeitung pausiert!</p>}
        {isEditing && (
          <canvas id={"edit-image"} className={"edit-canvas"} ref={editRef} />
        )}
      </div>
      <button
        onClick={generateScaled(
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
            scale: scale,
            width: editRef.current?.width ?? width,
            height: editRef.current?.height ?? height,
          }
        )}
      >
        +
      </button>
      <button onClick={() => generate4Bit(editRef.current)}>To 4 bit</button>
      <button disabled>-</button>
      <hr />
      <div className={"generate-image-inner-container"}>
        <button
          onClick={generateFullRotation(addImage(currentSelectedImage), {
            frameCount: animationFrames,
            width: width,
            height: height,
          })}
        >
          Add full rotation
        </button>

        <button
          onClick={generateFullMarquee(addImage(currentSelectedImage), {
            frameCount: animationFrames,
            width: width,
            height: height,
          })}
        >
          Add full marquee
        </button>
      </div>
    </BorderContainer>
  );
}

export default styled(GifMakerEditContainer)`
  .edit-image-inner-container {
    margin: 10px;
  }

  .generate-image-inner-container {
    margin: 10px;
  }
`;
