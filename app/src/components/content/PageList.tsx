import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import PageListItem from "./PageListItem";

export interface ContentList {
  title: string;
  points?: ContentList[]
}

interface PageListProps extends CompProps {
  style?: CSSProperties;
  content: ContentList[];
}

function PageList(props: PageListProps) {
  return (
    <div className="page-list" style={props.style}>
      <ul>
        {props.content.map((v, i) => <PageListItem content={v} key={i}/>)}
      </ul>
      {props.children}
    </div>
  );
}

export default PageList;
