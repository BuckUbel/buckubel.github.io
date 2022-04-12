import React from "react";
import styled from "styled-components";
import BorderContainer from "../../../../content/BorderContainer";
import {StateType, StyledCompProps} from "../../../../helper/types";

interface GifMakerSettingsContainerProps extends StyledCompProps {
  onlyVisual: boolean;
  widthState: StateType<number>;
  heightState: StateType<number>;
  animationFramesState: StateType<number>;
  scaleState: StateType<number>;
  qualityState: StateType<number>;
  transparentState: StateType<null | string>;
}

function GifMakerSettingsContainer({
                                     className,
                                     widthState: [width, setWidth],
                                     heightState: [height, setHeight],
                                     animationFramesState: [animationFrames, setAnimationFrames],
                                     scaleState: [scale, setScale],
                                     qualityState: [quality, setQuality],
                                     transparentState: [transparent, setTransparent],
                                   }: GifMakerSettingsContainerProps) {
  return (
    <BorderContainer extraClassName={className}>
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
        <div>
          <span>Quality</span>
          <input
            type={"number"}
            defaultValue={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </div>
        <div>
          <span>Transparenz</span>
          <input
            type={"checkbox"}
            checked={!!transparent}
            onChange={(e) => setTransparent(e.target.checked?"#000":null)}
          />
          <input
            type={"color"}
            disabled={!transparent}
            defaultValue={transparent ?? "#00"}
            onChange={(e) => setTransparent(String(e.target.value))}
          />
        </div>
      </div>
    </BorderContainer>
  );
}

export default styled(GifMakerSettingsContainer)`
  .edit-image-inner-container {
    margin: 0 10px;
  }
`;
