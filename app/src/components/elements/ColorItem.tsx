import React from "react";
import styled from "styled-components";
import {StyledCompProps} from "../helper/types";
import ColorRect from "./ColorRect";
import {Color} from "../config/color";


interface ColorItemProps extends StyledCompProps {
  color: string;
  onClick: () => void;
  selected: boolean;
  disabled?: boolean;
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
  padding: 4px;
  width: 145px;
  text-align: left;
  border: 1px solid ${({selected}) => selected ? Color.TEXT_PRIME_COLOR : 'transparent'};
  cursor: pointer;
  filter: ${({disabled})=>disabled?"blur(2px) brightness(0.5)":""}; 

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
