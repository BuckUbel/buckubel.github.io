import * as React from "react";
import defaultImage from "../../images/banner1024.png"
import styled from "styled-components";

interface BlurredImageProps {
  src: string;
  alt: string;
  isHover?: boolean;
  className?: string;
}

function BlurredImage({className, src, alt, isHover}: BlurredImageProps) {
  return (
    <div className={`${className} ${isHover ? "hovered" : ""}`}>
      <img src={src} alt={alt}/>
      <div className={`header-image-blur`}/>
    </div>
  );
}

export default styled(BlurredImage)`

  text-align: center;
  width: 100%;
  height: 100%;

  .header-image-blur {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url(${({src}) => src ? src : defaultImage});

    display: block;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    background-position: center;
    background-repeat: repeat;
    background-size: cover;

    box-shadow: inset 0 0 20px 8px black;
    transition: filter, -webkit-filter 0.5s;
  }

  img {
    display: inline-block;
    visibility: visible;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: auto;
    height: auto;
    z-index: 2;
    opacity:1;
    transform: scaleY(0) rotate(.5turn);
    transition: opacity 1s, width 1s, transform .5s;
  }

  &.hovered {
    .header-image-blur{
      filter: blur(6px);
      -webkit-filter: blur(6px);
    }
    img {
      opacity: 1;
      width: auto;
      transform: scaleY(1) rotate(0turn);
    }
  }
`;
