import React from 'react';
import styled from 'styled-components';
import {CompProps, StateType} from "../../helper/types";
import {Color} from "../../config/color";
import {TEXTCOLOR} from "../../config/css";

interface SitePreviewHeadlineProps extends CompProps {
  className?: string;
  isHover?: boolean;
  isOpenState?: StateType<boolean>
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
}

function SitePreviewHeadline(props: SitePreviewHeadlineProps) {
  return (
    <div className={props.className}>
      {props.leftItem}
      <h4 className={`site-preview-headline ${props.isHover ? "hovered" : ""}`}>
        {props.children}
      </h4>
      {props.rightItem}
    </div>

  );
}

export default styled(SitePreviewHeadline)`
  .site-preview-headline {
    display: inline-block;
    width: calc(100% - 124px);
    margin: 0;
    padding: 0 8px;
    vertical-align: middle;
    ${TEXTCOLOR(Color.BETA_COLOR)};

    font-style: italic;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    transition: color 1s, text-shadow 1s;

    &.hovered {
      ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
    }
  }

`;
