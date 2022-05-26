import React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../helper/types";
import ColorRect from "./ColorRect";
import {Color} from "../config/color";


interface ColorItemProps extends StyledCompProps {
  color: string;
  onClick: () => void;
  selected: boolean;
}

function ColorItem({className, color, children, onClick}: ColorItemProps) {

  return (
    <div key={color} className={className + " color-item-container"} onClick={onClick}>
      <ColorRect color={color}/>
      {children}
    </div>
  );
}

export default styled(ColorItem)`
  margin: 2px;
  padding:4px;
  width: 145px;
  text-align: left;
  border: ${({selected})=>selected? '1px solid ' + Color.TEXT_PRIME_COLOR: 'none'};

  :hover {
    background: ${Color.BETA_COLOR};
  }
  
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .color-rect {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
