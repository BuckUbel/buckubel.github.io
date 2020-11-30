import * as React from "react";
import {CompProps} from "../helper/types";

function Headline(props:CompProps) {
  return (
    <div className="headline">
      {props.children}
    </div>
  );
}

export default Headline;
