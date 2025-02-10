import React from 'react';
import styled from 'styled-components';
import {CompProps} from "../../helper/types";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface SitePreviewMiniIconsProps extends CompProps {
  className?: string;
  icons?: IconDefinition[]
  direction?: "left" | "right";
}

function SitePreviewMiniIcons(props: SitePreviewMiniIconsProps) {
  return (
    <div className={props.className}>
      {!!props.icons && props.icons.map((v, i) => <FontAwesomeIcon key={i} icon={v as IconProp}/>)}
      {props.children}
    </div>
  );
}

function getDirectionCSS({direction = "right"}: SitePreviewMiniIconsProps) {
  if (direction === "left") {
    return `  
    left: 0;
    top: 0;
    `;
  }
  if (direction === "right") {
    return `  
    right: 0;
    top: 0;
    `;
  }
}

export default styled(SitePreviewMiniIcons)`
  display: block;
  position: absolute;

  ${getDirectionCSS}
  > * {
    display: inline-block;
    vertical-align: middle;
    padding: 8px;
    font-size: 16px;
  }
`;
