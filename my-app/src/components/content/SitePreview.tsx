import React, {CSSProperties} from "react";
import {CompProps, SitePreviewInterface} from "../helper/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../css/SitePreview.css';
import Column from "../grid/Column";
import RoundButton from "../buttons/RoundButton";

interface SitePreviewProps extends CompProps {
  style?: CSSProperties;
  descriptionStyle?: CSSProperties;
  content: SitePreviewInterface;
  colCount?: number;
}

function SitePreview(props: SitePreviewProps) {
  return (
    <Column colCount={props.colCount ?? 3} maxWidth={"initial"}>
      <div className="site-preview" style={props.style}>
        <div className={"site-preview-bubble-container"}>
          <div className={"site-preview-bubble"}>
            <FontAwesomeIcon size={"2x"} icon={props.content.icon}/>
          </div>
        </div>
        <h4>{props.content.headline}</h4>
        <p className={"site-preview-description"} style={props.descriptionStyle}>
          {props.content.description}
        </p>
        <div className={"site-preview-link-placeholder"}/>
        <div className={"site-preview-link-container"}>
          <RoundButton link={props.content.buttonLink}
                       text={props.content.buttonText}/>
        </div>
      </div>
    </Column>
  );
}

export default SitePreview;
