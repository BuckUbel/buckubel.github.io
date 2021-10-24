import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledCompProps } from "../../../../helper/types";
import { getImageColors } from "../helper/getImageColors";
import BorderContainer from "../../../../content/BorderContainer";

interface GifMakerInfoContainerProps extends StyledCompProps {
  selectedRef: HTMLImageElement | null;
  timeLength: number;
  onlyVisual?: boolean;
}

type ColorCountArrayArray = {
  [imageName: string]: [string[], number[]];
};

function GifMakerInfoContainer({
  className,
  selectedRef,
  timeLength,
}: GifMakerInfoContainerProps) {
  const [colorCountArray, setColorCountArray] = useState<ColorCountArrayArray>(
    {}
  );

  useEffect(() => {
    if (
      selectedRef !== null &&
      selectedRef?.id !== "" &&
      colorCountArray[selectedRef.id] === undefined
    ) {
      const colorCountArray = getImageColors(selectedRef);
      const colors = Object.keys(colorCountArray);
      const colorCounts = Object.values(colorCountArray);
      setColorCountArray((prev) => {
        return { ...prev, [selectedRef.id]: [colors, colorCounts] };
      });
    }
  }, [selectedRef?.id]);

  return (
    <BorderContainer extraClassName={className}>
      <h4>Info</h4>
      {timeLength > 0 && (
        <div>
          <span>Timelength: {timeLength.toFixed(2)} Sekunden</span>
        </div>
      )}
      <div>
        {selectedRef !== null &&
          colorCountArray[selectedRef.id] !== undefined &&
          colorCountArray[selectedRef.id][0].map((color, index) => {
            return (
              <div key={color}>
                <span
                  className={"color-rect"}
                  style={{ backgroundColor: color }}
                />
                {color}:{colorCountArray[selectedRef.id][1][index]}
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
