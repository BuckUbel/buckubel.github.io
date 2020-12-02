import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DoorContentInterface} from "./DoorContent";
import {Color} from "../../../config/color";
import {BOX_SHADOW_PIXEL, TEXTCOLOR} from "../../../config/css";
import {crlfToP} from "../../../helper/crlfToP";

interface MyPropsForSolutionProps extends StyledCompProps {
  content: DoorContentInterface;
}

function MyPropsForSolution(props: MyPropsForSolutionProps) {

  return (
    <div className={props.className}>
      <div className={"placeholder"}/>
      <div className={"solution-container"}>
        {crlfToP(props.content.propsForSolution ?? "")}
      </div>
    </div>
  );
}

export default styled(MyPropsForSolution)`
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
        border: 1px solid ${Color.TEXT_INFO_COLOR};
        box-shadow: ${BOX_SHADOW_PIXEL} ${Color.TEXT_INFO_COLOR};
        ${TEXTCOLOR(Color.TEXT_INFO_COLOR)}
    }

`;
