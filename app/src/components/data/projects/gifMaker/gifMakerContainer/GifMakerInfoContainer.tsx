import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../../helper/types";
import { getImageColors } from "../helper/getImageColors";
import BorderContainer from "../../../../content/BorderContainer";

interface GifMakerInfoContainerProps extends StyledCompProps {
  selectedRef: HTMLImageElement | null;
  selectedImageString: string;
  timeLength: number;
  onlyVisual?: boolean;
}

function GifMakerInfoContainer(props: GifMakerInfoContainerProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [colorCounts, setColorCounts] = useState<number[]>([]);

  useEffect(() => {
    if (props.selectedRef !== null) {
      const colorCountArray = getImageColors(props.selectedRef);
      setColors(Object.keys(colorCountArray));
      setColorCounts(Object.values(colorCountArray));
    }
  }, [props.selectedImageString, props.selectedRef !== null]);

  return (
    <BorderContainer extraClassName={props.className}>
      <h4>Info</h4>
      {props.timeLength > 0 && (
        <div>
          <span>Timelength: {props.timeLength.toFixed(2)} Sekunden</span>
        </div>
      )}
      <div>
        {colors.map((color, index) => {
          return (
            <div key={color}>
              <span
                className={"color-rect"}
                style={{ backgroundColor: color }}
              />
              {color}:{colorCounts[index]}
            </div>
          );
        })}
      </div>
    </BorderContainer>
  );
}

export default styled(GifMakerInfoContainer)`
  font-family: monospace;

  > div {
    margin-left: 20%;
    text-align: left;
  }

  .color-rect {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
