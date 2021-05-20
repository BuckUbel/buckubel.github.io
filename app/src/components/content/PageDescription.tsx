import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface PageDescriptionProps extends CompProps {
  style?: CSSProperties;
  content?: string;
}

function PageDescription(props: PageDescriptionProps) {
  return (
    <div className="page-description" style={props.style}>
      <ReactMarkdown remarkPlugins={[gfm]}>{props.content ?? ""}</ReactMarkdown>
      {props.children}
    </div>
  );
}

export default PageDescription;
