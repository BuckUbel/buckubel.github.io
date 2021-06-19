import React from 'react';
import styled from 'styled-components';
import RoundButton from "../../buttons/RoundButton";

interface SitePreviewLinkProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  text?: string | JSX.Element;
  icon?: string | JSX.Element;
}

function SitePreviewLink(props: SitePreviewLinkProps) {
  return (
    <div className={props.className}>
      <div className={"site-preview-link-placeholder"}/>
      <div className={"site-preview-link-container"}>
        {!props.onClick && !!props.text && <p>{props.text}</p>}
        {!!props.onClick &&
        <RoundButton onClick={props.onClick} text={props.text} icon={props.icon}/>
        }
      </div>
    </div>
  );
}

export default styled(SitePreviewLink)`
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
  }`;
