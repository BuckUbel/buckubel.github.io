import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {File} from "../config/files";
import FileLink from "./FileLink";

interface PageFileLinkListProps extends CompProps {
  style?: CSSProperties;
  files: File[];
}

function PageFileLinkList(props: PageFileLinkListProps) {
  return <div className={"file-link-list"} style={props.style}>
    {props.files.map((v, i) => <FileLink file={v} key={i}/>)}
  </div>;
}

export default PageFileLinkList;
