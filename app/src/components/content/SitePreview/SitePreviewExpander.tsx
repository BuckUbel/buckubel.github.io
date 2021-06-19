import React, {CSSProperties} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {StateType} from "../../helper/types";
import {Color} from "../../config/color";
import {TEXTCOLOR} from "../../config/css";

interface SitePreviewExpanderProps {
  className?: string;
  isOpenState: StateType<boolean>;
  color?: string;
  style?: CSSProperties
}

function SitePreviewExpander(props: SitePreviewExpanderProps) {
  const [isOpen, setIsOpen] = props.isOpenState;
  return (
    <div className={props.className} style={props.style} onClick={() => setIsOpen(!isOpen)}>
      <FontAwesomeIcon size={"2x"} icon={isOpen ? faChevronUp : faChevronDown}/>
    </div>
  );
}

export default styled(SitePreviewExpander)`
  display: inline-block;
  vertical-align: middle;
  padding: 10px;
  border: 1px solid ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
  box-shadow: 0 0 12px 2px ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
  ${({color}) => color ? TEXTCOLOR(color) : TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
`;
