import React, {CSSProperties} from "react";
import {StyledCompProps} from "../helper/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Column from "../grid/Column";
import RoundButton from "../buttons/RoundButton";
import styled from "styled-components";
import {Color} from "../config/color";
import {TEXTCOLOR} from "../config/css";
import {getRouteHref} from "../config/routes";
import {ProjectEntryInterface} from "../data/projects/projects";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface ProjectPreviewProps extends StyledCompProps {
  style?: CSSProperties;
  descriptionStyle?: CSSProperties;
  id: number;
  content: ProjectEntryInterface;
  colCount?: number;
}

function ProjectPreview(props: ProjectPreviewProps) {
  return (
    <Column colCount={props.colCount ?? 3} maxWidth={"350px"}>
      <div className={props.className} style={props.style}>
        {props.content.icon !== undefined && <div className={"site-preview-bubble-container"}>
          <div className={"site-preview-bubble"}>
            <FontAwesomeIcon size={"2x"} icon={props.content.icon}/>
          </div>
        </div>}
        <h4>{props.content.title}</h4>
        {props.content.description !== undefined &&
        <p className={"site-preview-description"} style={props.descriptionStyle}>
          {props.content.description}
        </p>
        }
        <div className={"site-preview-link-placeholder"}/>
        <div className={"site-preview-link-container"}>
          <RoundButton link={getRouteHref("projectEntry") + props.id + "/"}
                       icon={<FontAwesomeIcon icon={faChevronRight}/>}/>
        </div>
      </div>
    </Column>
  );
}

export default styled(ProjectPreview)`

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


    h4 {
        ${TEXTCOLOR(Color.BETA_COLOR)};

        font-style: italic;
        font-size: 25px;
        font-weight: 500;
        text-align: center;
        margin: 25px 0 5px 0;

        transition: color 1s, text-shadow 1s;

        :hover {
            ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

        }
    }

    .site-preview-bubble-container {
        width: 100%;
        display: block;
        text-align: center;
        position: relative;

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
        }

        .site-preview-bubble svg {
            margin: 14px 0;
        }
    }

    .site-preview-description {
        text-align: center;
        width: 80%;
        display: inline-block;
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

`;
