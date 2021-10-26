import React, { useState } from "react";
import styled from "styled-components";
import BorderContainer from "../../../../content/BorderContainer";
import { StyledCompProps } from "../../../../helper/types";
import TextButton from "../TextButton";
import { faImages, faTrash } from "@fortawesome/free-solid-svg-icons";

interface GifMakerFramesContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  frameCount: number;
  reset: () => void;
  framesContainerRef: React.Ref<HTMLDivElement>;
}

function GifMakerFramesContainer({
  className,
  onlyVisual,
  frameCount,
  reset,
  framesContainerRef,
}: GifMakerFramesContainerProps) {
  const [showFrames, setShowFrames] = useState(false);

  return (
    <BorderContainer extraClassName={className}>
      <div className={"canvas-info-container"}>
        <TextButton
          content={(showFrames ? "Hide" : "Show") + " Frames: " + frameCount}
          icons={[faImages]}
          onClick={() => setShowFrames((prev) => !prev)}
        />
        <TextButton
          content={"Reset Frames"}
          icons={[faTrash]}
          onClick={reset}
        />
      </div>
      <div
        className={`canvas-inner-container ${
          showFrames ? "" : "hide-canvas-inner-container"
        }`}
        ref={framesContainerRef}
      />
    </BorderContainer>
  );
}

export default styled(GifMakerFramesContainer)`
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
`;
