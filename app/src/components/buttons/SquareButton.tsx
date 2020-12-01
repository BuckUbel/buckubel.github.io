import React, {CSSProperties} from "react";
import {StyledCompProps} from "../helper/types";
import {useRouteLink} from "react-router-ts";
import styled from "styled-components";
import {Color} from "../config/color";

interface SquareButtonProps extends StyledCompProps {
  style?: CSSProperties;
  link: string;
  text: string;
}

function SquareButton(props: SquareButtonProps) {

  const routeLink = useRouteLink(props.link);

  return (
    <div className={props.className} onClick={routeLink.onClick}>
      <button>
        {props.text}
      </button>
    </div>
  );
}

export default styled(SquareButton)`
    display: inline-block;
    position: relative;
    width: 100%;


    button {
        background: ${Color.BETA_COLOR};
        border-radius: 20px;
        border: none;
        color: ${Color.TEXT_PRIME_COLOR};
        font-size: 20px;
        padding: 10px 20px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 95%;
        width: 100%;

        transition: color 1s, background 1s;

        :hover {
            background: ${Color.TEXT_PRIME_COLOR};
            color: ${Color.BETA_COLOR};
        }
    }
`;
