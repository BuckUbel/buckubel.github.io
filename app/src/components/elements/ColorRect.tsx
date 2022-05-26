import * as React from "react";
import {MouseEventHandler} from "react";
import styled from "styled-components";
import {StyledCompProps} from "../helper/types";


interface ColorRectProps extends StyledCompProps {
  color: string
  onClick?: () => void;
  onContextClick?: () => void;
  withoutShadow?: boolean
}

function ColorRect({className, onClick, onContextClick}: ColorRectProps) {

  const spanClick: MouseEventHandler<HTMLSpanElement> = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.preventDefault();
    if (!!onClick) {
      onClick();
    }
  }

  const contextMenu: MouseEventHandler<HTMLSpanElement> = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.preventDefault();
    if (!!onContextClick) {
      onContextClick();
    }
  }
  const mouseOver: MouseEventHandler<HTMLSpanElement> = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.preventDefault();
    if (ev.buttons === 1 && !!onClick) {
      onClick();
    }
    if (ev.buttons === 2 && !!onContextClick) {
      onContextClick();
    }
  }


  return (
    <span className={className + " color-rect"} onContextMenu={contextMenu} onClick={spanClick} onMouseOver={mouseOver}
          onMouseDown={mouseOver}/>
  );
}

export default styled(ColorRect)`
  background-color: ${({color}) => color};
  box-shadow: ${({withoutShadow, color}) => withoutShadow ? 'none' : '0px 0px 10px 2px' + color};
`;
