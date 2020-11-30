import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {File} from "../config/files";

interface FileLinkProps extends CompProps {
  style?: CSSProperties;
  file: File;
}

function FileLink(props: FileLinkProps) {
  return (
    <a className="file-link" style={props.style} href={props.file.fileName}>
      {props.file.displayName}
      {props.children}
    </a>
  );
}

export default FileLink;
