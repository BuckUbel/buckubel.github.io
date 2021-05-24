import React from 'react';
import styled from 'styled-components';
import {CompProps} from "../../helper/types";
import {Color} from "../../config/color";
import {TEXTCOLOR} from "../../config/css";

interface SitePreviewHeadlineProps extends CompProps {
  className?: string;
  isHover?: boolean;
}

function SitePreviewHeadline(props: SitePreviewHeadlineProps) {
  return (
    <h4 className={`${props.className} site-preview-headline ${props.isHover ? "hovered" : ""}`}>
      {props.children}
    </h4>
  );
}

export default styled(SitePreviewHeadline)`
  ${TEXTCOLOR(Color.BETA_COLOR)};

  font-style: italic;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  margin: 25px 0 5px 0;

  transition: color 1s, text-shadow 1s;

  &.hovered {
    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
  }
`;
