import * as React from "react";
import {StyledCompProps} from "../helper/types";
import styled from "styled-components";

function Headline(props: StyledCompProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}

export default styled(Headline)`
    font-size: 30px;
    text-align: center;
    transition: font-size 1s;

    :hover {
        font-size: 45px;
    }
`;
