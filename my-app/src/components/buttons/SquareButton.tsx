import React, {CSSProperties} from "react";
import {CompProps} from "../helper/types";
import {useRouteLink} from "react-router-ts";
import '../../css/RoundButton.css';
import '../../css/SquareButton.css';

interface SquareButtonProps extends CompProps {
  style?: CSSProperties;
  link: string;
  text: string;
}

function SquareButton(props: SquareButtonProps) {

  const routeLink = useRouteLink(props.link);

  return (
    <div className={"round-button square-button"}>
      <a href={props.link}>
        <button onClick={routeLink.onClick}>
          {props.text}
        </button>
      </a>
    </div>
  );
}

export default SquareButton;
