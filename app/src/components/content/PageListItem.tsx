import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import PageList, {ContentList} from "./PageList";

interface PageListItemProps extends CompProps {
  style?: CSSProperties;
  content: ContentList;
}

function PageListItem(props: PageListItemProps) {
  return (
    <li className="page-list-item" style={props.style}>
      {props.content.title}
      {props.content.points && <PageList content={props.content.points}/>}
      {props.children}
    </li>
  );
}

export default PageListItem;
