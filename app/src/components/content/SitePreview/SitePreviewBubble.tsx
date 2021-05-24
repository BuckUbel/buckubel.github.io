import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Color} from "../../config/color";
import {TEXTCOLOR} from "../../config/css";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface SitePreviewBubbleProps {
  className?: string;
  isHover: boolean
  icon?: IconDefinition
  backgroundColor?: string;
}

function SitePreviewBubble(props: SitePreviewBubbleProps) {
  return (
    <div className={props.className}>
      <div className={`site-preview-bubble ${props.isHover ? "hovered" : ""}`}>
        {!!props.icon && <FontAwesomeIcon size={"2x"} icon={props.icon}/>}
      </div>
    </div>
  );
}

export default styled(SitePreviewBubble)`
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
  z-index: 1;

  .site-preview-bubble {
    background: ${({backgroundColor}) => backgroundColor ?? Color.PRIME_COLOR};
    ${TEXTCOLOR(Color.BETA_COLOR)};

    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    left: calc(50% - 30px);
    top: -45px;
    opacity: 1;
    transition: opacity 1s;

    &.hovered {
      opacity: 0;
    }
  }

  .site-preview-bubble svg {
    margin: 14px 0;
  }`;
