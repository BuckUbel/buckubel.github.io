import * as React from "react";
import {StyledCompProps} from "../helper/types";
import styled from "styled-components";
import {Color} from "../config/color";

function Navigation(props: StyledCompProps) {
  return (
    <div className={props.className}>
      <div className="navigation-main-icon">
        BU
      </div>
      {props.children}
    </div>
  );
}

export default styled(Navigation)`
    display: block;
    position: fixed;
    width: 150px;
    height: 100%;

    color: white;
    text-align: left;

    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
    background: ${Color.PRIME_COLOR};

    .navigation-main-icon {
        vertical-align: middle;
        display: inline-block;
        position: relative;
        background: ${Color.PRIME_COLOR};
        color: ${Color.BETA_COLOR};
        padding: 10px 15px;
        width: calc(100% - 30px);
        height: 60px;
        line-height: 60px;
        word-break: break-all;
        text-align: center;

        font-size: 58px;
        font-style: italic;
    }

`;
