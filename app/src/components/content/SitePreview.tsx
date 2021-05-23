import React, {CSSProperties, useState} from "react";
import {SitePreviewInterface, StyledCompProps} from "../helper/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Column from "../grid/Column";
import styled from "styled-components";
import {Color} from "../config/color";
import {TEXTCOLOR} from "../config/css";
import BlurredImage from "./BlurredImage";
import {useRouteLink} from "react-router-ts";
import RoundButton from "../buttons/RoundButton";

interface SitePreviewProps extends StyledCompProps {
  style?: CSSProperties;
  descriptionStyle?: CSSProperties;
  content: SitePreviewInterface;
  colCount?: number;
}

function SitePreview(props: SitePreviewProps) {
  const [isHover, setIsHover] = useState(false);
  const routeLink = useRouteLink(props.content.link ?? "");
  const handleClick = (asButton: boolean) => (e: React.MouseEvent<HTMLElement>) => {
    if ((!props.content.buttonText && !asButton) || (!!props.content.buttonText && asButton)) {
      routeLink.onClick(e)
    }
    if (!!props.content.onClick) {
      props.content.onClick();
    }
  }
  return (
    <Column className={props.className} colCount={props.colCount ?? 3} maxWidth={"350px"}
            onHover={(v) => setIsHover(v)}>
      <div className={"site-preview-container"} style={props.style}
           onClick={handleClick(false)}>

        {props.content.icon !== undefined && <div className={"site-preview-bubble-container"}>
            <div className={`site-preview-bubble ${isHover && !!props.content.image ? "hovered" : ""}`}>
                <FontAwesomeIcon size={"2x"} icon={props.content.icon}/>
            </div>
        </div>}

        <h4>{props.content.title}</h4>
        {props.content.description !== undefined &&
        <p className={"site-preview-description"} style={props.descriptionStyle}>
          {props.content.description.substring(0, 100)}
        </p>
        }

        {props.content.buttonText !== undefined &&
        <>
            <div className={"site-preview-link-placeholder"}/>
            <div className={"site-preview-link-container"}>
                <RoundButton onClick={handleClick(true)}
                             text={props.content.buttonText}/>
            </div>
        </>}
      </div>

      {props.content.image && <div className={"site-preview-image-container"}>
          <BlurredImage src={props.content.image} alt={"Bild von " + props.content.title}
                        isHover={isHover}/>
      </div>}

    </Column>
  );
}

export default styled(SitePreview)`

  .site-preview-image-container {
    position: absolute;
    width: 350px;
    height: 55px;

    img {
      max-width: 350px;
      max-height: 55px;
    }
  }

  .site-preview-container {

    position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    background: #58585a;
    color: white;
    border-radius: 10px;
    width: 100%;

    padding: 20px;
    margin: 35px 5px 5px 5px;
    box-shadow: inset 0 20px 150px -10px black;
    transition: box-shadow 1s;

    h4 {
      ${TEXTCOLOR(Color.BETA_COLOR)};

      font-style: italic;
      font-size: 25px;
      font-weight: 500;
      text-align: center;
      margin: 25px 0 5px 0;

      transition: color 1s, text-shadow 1s;
    }

    .site-preview-bubble-container {
      width: 100%;
      display: block;
      text-align: center;
      position: relative;
      z-index: 1;

      .site-preview-bubble {
        background: ${Color.PRIME_COLOR};
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
      }
    }

    .site-preview-description {
      text-align: center;
      width: 80%;
      display: inline-block;
      color: ${Color.TEXT_GREY_COLOR};
      transition: color 1s;
    }

    .site-preview-link-placeholder {
      width: 100%;
      height: 43px;
    }

    .site-preview-link-container {
      position: absolute;
      display: block;
      bottom: 10px;
      left: 0;
      right: 0;
      text-align: right;
    }

    :hover {
      box-shadow: inset 0 20px 60px -10px black;

      h4 {
        ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
      }

      .site-preview-description {
        color: ${Color.TEXT_PRIME_COLOR};
      }
    }
  }
`;
