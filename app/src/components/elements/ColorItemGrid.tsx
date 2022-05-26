import React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../helper/types";


interface ColorItemGridProps extends StyledCompProps {
  size: number;
}

function ColorItemGrid({className, children}: ColorItemGridProps) {
  return (
    <div className={className + " color-item-grid"}>
      {children}
    </div>
  );
}

export default styled(ColorItemGrid)`
  background-color: #2196F3;
  display: grid;
  grid-template-columns: repeat(${({size}) => size}, 1fr);
  grid-template-rows: repeat(${({size}) => size}, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
  width: 400px;
  height: 400px;

  .color-rect {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
