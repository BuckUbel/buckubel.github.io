import React, {CSSProperties} from 'react';
import styled from 'styled-components';
import {Color} from "../../config/color";
import {CompProps} from "../../helper/types";

interface SitePreviewDescriptionProps extends CompProps {
  className?: string;
  style?: CSSProperties;
}

function SitePreviewDescription(props: SitePreviewDescriptionProps) {
  return (
    <>
      <p className={`${props.className} site-preview-description ${props.isHover ? "hovered" : ""}`}
         style={props.style}>
        {props.children}
      </p>
    </>
  );
}

export default styled(SitePreviewDescription)`
  text-align: center;
  width: 80%;
  display: inline-block;
  color: ${Color.TEXT_GREY_COLOR};
  transition: color 1s;

  &.hovered {
    color: ${Color.TEXT_PRIME_COLOR};
  }
`;
