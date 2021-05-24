import React from 'react';
import styled from 'styled-components';
import BlurredImage from "../BlurredImage";
import {CompProps} from "../../helper/types";

interface SitePreviewImageProps extends CompProps {
  className?: string;
  isHover?: boolean;
  alt?: string;
  src: string;
  width?: number;
  height?: number;
}

function SitePreviewImage({className, isHover, alt = "", src}: SitePreviewImageProps) {
  return (
    <div className={`${className} site-preview-image-container`}>
      <BlurredImage src={src} alt={"Bild von " + alt} isHover={isHover}/>
    </div>
  );
}

export default styled(SitePreviewImage)`
  position: absolute;
  width: ${({width}) => width ?? 350}px;
  height: ${({height}) => height ?? 55}px;

  img {
    max-width: ${({width}) => width ?? 350}px;
    max-height: ${({height}) => height ?? 55}px;
  }
`;
