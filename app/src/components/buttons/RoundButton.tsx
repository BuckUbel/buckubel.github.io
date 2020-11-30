import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {useRouteLink} from "react-router-ts";
import '../../css/RoundButton.css';

interface RoundButtonProps extends CompProps {
  style?: CSSProperties;
  link: string;
  text: string;
}

function RoundButton(props: RoundButtonProps) {

  const routeLink = useRouteLink(props.link);

  return (
    <div className={"round-button"}>
      <a href={props.link}>
        <button onClick={routeLink.onClick}>
          {props.text}
        </button>
      </a>
    </div>
  );
}

export default RoundButton;
