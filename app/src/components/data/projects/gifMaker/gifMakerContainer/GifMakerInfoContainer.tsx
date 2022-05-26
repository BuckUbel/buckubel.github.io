import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../../helper/types";
import {getImageColors} from "../helper/getImageColors";
import BorderContainer from "../../../../content/BorderContainer";
import ColorItemList from "../../../../elements/ColorItemList";

interface GifMakerInfoContainerProps extends StyledCompProps {
  selectedRef: HTMLImageElement | null;
  currentSelectedImage: string;
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
  const [shouldCalculate, setShouldCalculate] = useState<boolean>(false);

  useEffect(() => {
    if (
      shouldCalculate &&
      selectedRef !== null &&
      selectedRef?.id !== "" &&
      colorCountArray[selectedRef.id] === undefined
    ) {
      const colorCountArray = getImageColors(selectedRef);
      const colors = Object.keys(colorCountArray);
      const colorCounts = Object.values(colorCountArray);
      setColorCountArray((prev) => {
        return {...prev, [selectedRef.id]: [colors, colorCounts]};
      });
    }
  }, [selectedRef?.id ?? "", shouldCalculate]);

  return (
    <BorderContainer extraClassName={className}>
      <h4>Info</h4>
      {timeLength > 0 && (
        <div>
          <span>Timelength: {timeLength.toFixed(2)} Sekunden</span>
        </div>
      )}
      <div>
        <span>Farben berechnen?</span>
        <input
          type={"checkbox"}
          disabled={selectedRef === null}
          checked={shouldCalculate}
          onChange={(e) => setShouldCalculate(e.target.checked)}
        />
      </div>
      {shouldCalculate &&
      selectedRef !== null &&
      selectedRef.id !== "" &&
      colorCountArray[selectedRef.id] !== undefined &&
      <ColorItemList
          colors={colorCountArray[selectedRef.id][0]}
          renderText={(color: string, index: number) => <>{color}:{colorCountArray[selectedRef.id][1][index]}</>}
      />}
    </BorderContainer>
  );
}

export default styled(GifMakerInfoContainer)`
  font-family: monospace;

  .color-calculation-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    align-items: flex-start;
  }
`;
