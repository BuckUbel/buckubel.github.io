import * as React from "react";
import {CompProps} from "../helper/types";
import '../../css/Navigation.css';

function Navigation(props: CompProps) {
  return (
    <div className="navigation">
      <div className="navigation-main-icon">
        BU
      </div>
      {props.children}
    </div>
  );
}

export default Navigation;
