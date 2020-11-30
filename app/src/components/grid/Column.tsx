import React from "react";
import {CompProps} from "../helper/types";
import '../../css/SitePreview.css';

interface ColumnProps extends CompProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  colCount?: number;
  withoutBottomMargin?: boolean;
}

function Column(props: ColumnProps) {
  const widthValue = props.width ? props.width : "initial";
  const minWidthValue = props.minWidth ? props.minWidth : "250px";
  const maxWidthValue = props.maxWidth ? props.maxWidth : "400px";
  const flexBasisValue = props.colCount ? "calc(" + (100 / props.colCount).toFixed(0) + "% - 2px)" : "auto";
  const marginValue = "1px  1px " + (props.withoutBottomMargin ? "1px" : "10px") + " 1px";

  return (
    <div className="column"
         style={{
           width: widthValue,
           minWidth: minWidthValue,
           maxWidth: maxWidthValue,
           flexBasis: flexBasisValue,
           margin: marginValue,
         }}>
      {props.children}
    </div>
  );
}

export default Column;
