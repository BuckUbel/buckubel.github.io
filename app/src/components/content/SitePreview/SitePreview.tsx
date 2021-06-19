import React, {CSSProperties, useState} from "react";
import {SitePreviewInterface, StyledCompProps} from "../../helper/types";
import Column from "../../grid/Column";
import styled from "styled-components";
import {useRouteLink} from "react-router-ts";
import SitePreviewContent from "./SitePreviewContent";
import SitePreviewHeadline from "./SitePreviewHeadline";
import SitePreviewDescription from "./SitePreviewDescription";
import SitePreviewImage from "./SitePreviewImage";
import SitePreviewLink from "./SitePreviewLink";
import SitePreviewBubble from "./SitePreviewBubble";

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
      <SitePreviewContent style={props.style} onClick={handleClick(false)} isHover={isHover}>
        {props.content.icon !== undefined &&
        <SitePreviewBubble isHover={isHover && !!props.content.image} icon={props.content.icon}/>}
        <SitePreviewHeadline isHover={isHover}>{props.content.title}</SitePreviewHeadline>
        {props.content.description !== undefined &&
        <SitePreviewDescription isHover={isHover}><p>{props.content.description}</p></SitePreviewDescription>}
        {props.content.buttonText !== undefined &&
        <SitePreviewLink onClick={handleClick(true)} text={props.content.buttonText}/>
        }
      </SitePreviewContent>
      {props.content.image &&
      <SitePreviewImage src={props.content.image} alt={"Bild von " + props.content.title} isHover={isHover}/>
      }
    </Column>
  );
}

export default styled(SitePreview)``;
