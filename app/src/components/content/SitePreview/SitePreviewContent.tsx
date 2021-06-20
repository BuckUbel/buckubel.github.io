import React, {CSSProperties} from 'react';
import styled from 'styled-components';
import {CompProps} from "../../helper/types";

interface SitePreviewContentProps extends CompProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  isHover?: boolean;
}

function SitePreviewContent(props: SitePreviewContentProps) {
  return (
    <div className={`${props.className} site-preview-content ${props.isHover ? "hovered" : ""}`}
         style={props.style}
         onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default styled(SitePreviewContent)`
  position: relative;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  background: #58585a;
  color: white;
  border-radius: 10px;
  width: calc(100% - 50px);

  padding: 40px 20px 20px 20px;
  margin: 35px 5px 5px 5px;
  box-shadow: inset 0 20px 150px -10px black;
  transition: box-shadow 1s;

  &.hovered {
    box-shadow: inset 0 20px 60px -10px black;
  }
`;
