import React from "react";
import {CompProps} from "../helper/types";

interface ColumnProps extends CompProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  colCount?: number;
  withoutBottomMargin?: boolean;
  className?: string;
  onHover?: (v: boolean) => void;
}

function Column(props: ColumnProps) {
  const widthValue = props.width ? props.width : "initial";
  const minWidthValue = props.minWidth ? props.minWidth : "250px";
  const maxWidthValue = props.maxWidth ? props.maxWidth : "400px";
  const flexBasisValue = props.colCount ? "calc(" + (100 / props.colCount).toFixed(0) + "% - 2px)" : "auto";
  const marginValue = "1px  1px " + (props.withoutBottomMargin ? "1px" : "10px") + " 1px";

  const handleHover = (value: boolean) => () => {
    if (props.onHover) {
      props.onHover(value)
    }
  }

  return (
    <div className={`column ${props.className ?? ""}`}
         style={{
           width: widthValue,
           minWidth: minWidthValue,
           maxWidth: maxWidthValue,
           flexBasis: flexBasisValue,
           margin: marginValue,
         }}
         onMouseEnter={handleHover(true)}
         onMouseLeave={handleHover(false)}
    >
      {props.children}
    </div>
  );
}

export default Column;
