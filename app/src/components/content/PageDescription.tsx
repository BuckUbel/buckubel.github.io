import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";

interface PageDescriptionProps extends CompProps {
  style?: CSSProperties;
  content?: string;
}

function PageDescription(props: PageDescriptionProps) {
  return (
    <div className="page-description" style={props.style}>
      {props?.content?.split("\n").map((v, i) => <p key={i}>{v}</p>)}
      {props.children}
    </div>
  );
}

export default PageDescription;
