import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {crlfToP} from "../helper/crlfToP";

interface PageDescriptionProps extends CompProps {
  style?: CSSProperties;
  content?: string;
}

function PageDescription(props: PageDescriptionProps) {
  return (
    <div className="page-description" style={props.style}>
      {crlfToP(props.content ?? "")}
      {props.children}
    </div>
  );
}

export default PageDescription;
