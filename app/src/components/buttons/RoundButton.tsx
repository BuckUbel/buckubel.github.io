import React, {CSSProperties} from "react";
import {StyledCompProps} from "../helper/types";
import {useRouteLink} from "react-router-ts";
import styled from "styled-components";
import {Color} from "../config/color";

interface RoundButtonProps extends StyledCompProps {
  style?: CSSProperties;
  link: string;
  text: string;
}

function RoundButton(props: RoundButtonProps) {
  const routeLink = useRouteLink(props.link);
  return (
    <div className={props.className}>
      <a href={props.link}>
        <button onClick={routeLink.onClick}>
          {props.text}
        </button>
      </a>
    </div>
  );
}

export default styled(RoundButton)`
    display: inline-block;
    position: relative;
    width: 100%;

    a button {
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
    }
`;
