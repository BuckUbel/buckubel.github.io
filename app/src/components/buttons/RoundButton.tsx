import React, {CSSProperties} from "react";
import {StyledCompProps} from "../helper/types";
import {useRouteLink} from "react-router-ts";
import styled from "styled-components";
import {Color} from "../config/color";

interface RoundButtonProps extends StyledCompProps {
  style?: CSSProperties;
  link: string;
  onClick?: () => void;
  text: string | JSX.Element;
  float?: string;
  width?: string;
}

function RoundButton(props: RoundButtonProps) {
  const routeLink = useRouteLink(props.onClick ? "" : props.link);
  return (
    <div className={"round-button " + props.className} onClick={!!props.onClick ? props.onClick : routeLink.onClick}>
      <button>
        {props.text}
      </button>
    </div>
  );
}

export default styled(RoundButton)`
    display: inline-block;
    position: relative;
    width: ${({width}) => width !== undefined ? width : "initial"};
    padding: 0 10px;

    button {
        background: ${Color.BETA_COLOR};
        color: ${Color.TEXT_PRIME_COLOR};
        border-radius: 20px;
        border: none;
        font-size: 20px;
        padding: 10px 20px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 95%;
        float: ${({float}) => float !== undefined ? float : "initial"};
        transition: color 1s, background 1s;

        :hover {
            background: ${Color.TEXT_PRIME_COLOR};
            color: ${Color.BETA_COLOR};
        }
    }
`;
