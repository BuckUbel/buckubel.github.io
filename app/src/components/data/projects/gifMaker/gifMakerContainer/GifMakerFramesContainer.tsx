import React, {useState} from "react";
import styled from "styled-components";
import BorderContainer from "../../../../content/BorderContainer";
import {StyledCompProps} from "../../../../helper/types";
import TextButton from "../TextButton";
import {faImages, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Color} from "../../../../config/color";

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
    const [showFrames, setShowFrames] = useState(true);

    return (
        <BorderContainer extraClassName={className}>
            <div className={"canvas-info-container"}>

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
            >
                {frameCount === 0&& <p>Keine Frames hinzugefügt!</p>}
            </div>
            {frameCount > 3 && <TextButton
                content={(showFrames ? "Show" : "Hide") + " Frames: " + frameCount}
                icons={[faImages]}
                onClick={() => setShowFrames((prev) => !prev)}
            />}
        </BorderContainer>
    );
}

function getSize(props: GifMakerFramesContainerProps) {
    if (props.frameCount > 40) return 20;
    if (props.frameCount > 25) return 40;
    if (props.frameCount > 10) return 75;
    return 100;
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
    border: 2px ${Color.TEXT_PRIME_COLOR} solid;
    height: calc(100% - 100px);

    transition: height 0.8s;
    
    &.hide-canvas-inner-container {
      height:${(props)=>getSize(props)+4}px;
    }

    canvas {
      max-width: ${getSize}px;
      max-height: ${getSize}px;
    }
  }


`;
