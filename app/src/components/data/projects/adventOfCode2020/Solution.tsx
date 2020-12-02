import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DoorContentInterface} from "./DoorContent";
import {Color} from "../../../config/color";
import {BOX_SHADOW_PIXEL, TEXTCOLOR} from "../../../config/css";
import {crlfToP} from "../../../helper/crlfToP";

interface SolutionProps extends StyledCompProps {
  content: DoorContentInterface;
}

function Solution(props: SolutionProps) {

  return (
    <div className={props.className}>
      <div className={"placeholder"}/>
      <div className={"solution-container"}>
        <div>{crlfToP(props.content.solution)}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default styled(Solution)`
    margin-top: 10px;

    .placeholder {
        width: calc(10% + 68px);
        display: inline-block;
        vertical-align: top;
    }

    .solution-container {
        width: calc(90% - 68px);
        max-width: 648px;
        min-height: 48px;
        display: inline-block;
        text-align: left;
        vertical-align: top;
        padding: 10px;
        border: 1px solid ${Color.TEXT_SUCCESS_COLOR};
        box-shadow: ${BOX_SHADOW_PIXEL} ${Color.TEXT_SUCCESS_COLOR};

        ${TEXTCOLOR(Color.TEXT_SUCCESS_COLOR)}
        hr {
            border: 1px solid ${Color.TEXT_SUCCESS_COLOR};
        }
    }

`;
