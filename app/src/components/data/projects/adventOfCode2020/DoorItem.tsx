import React, {CSSProperties, useState} from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faLanguage} from '@fortawesome/free-solid-svg-icons'
import RoundButton from "../../../buttons/RoundButton";
import {Color} from "../../../config/color";
import {crlfToP} from "../../../helper/crlfToP";
import {TEXTCOLOR} from "../../../config/css";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface DoorItemProps extends StyledCompProps {
  content: string;
  translation?: string;
  color?: string;
  openPreset?: boolean;
  style?: CSSProperties;
}

function DoorItem({translation, openPreset = true, content, className, children, style}: DoorItemProps) {

  const [translated, setTranslated] = useState(!!translation);
  const [open, setOpen] = useState(openPreset);
  return (
    <div className={className} style={style}>
      {!translation && <div className={"placeholder"}/>}
      {!!translation && <RoundButton onClick={() => setTranslated(!translated)}
                                     icon={<FontAwesomeIcon icon={faLanguage as IconProp}/>} width={"10%"}/>}
      <div className={"close-button"} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon size={"2x"} icon={(open ? faChevronUp : faChevronDown) as IconProp}/>
      </div>
      <div className={"door-item " + (!open ? "hide-most-text" : "")}>
        {translated && translation !== undefined && crlfToP(translation)}
        {!translated && crlfToP(content)}
        {!!children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default styled(DoorItem)`
    width: 100%;
    margin-bottom: 10px;

    .placeholder {
        width: calc(10% + 20px);
        display: inline-block;
        vertical-align: top;
    }

    .round-button {
        vertical-align: top;
    }

    .close-button {
        display: inline-block;
        vertical-align: top;
        padding: 10px;
                border: 1px solid ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
        box-shadow: 0 0 12px 2px ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
        ${({color}) => color ? TEXTCOLOR(color) : TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
    }

    .door-item {
        width: 80%;
        max-width: 648px;
        max-height: 2500px;
        min-height: 48px;
        display: inline-block;
        text-align: left;
        vertical-align: top;
        padding: 10px;
        border: 1px solid ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
        overflow: hidden;
        font-size: 14px;

        //width: calc(90% - 68px);
        border: 1px solid ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
        box-shadow: 0 0 12px 2px ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
        ${({color}) => color ? TEXTCOLOR(color) : TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

        transition: max-height 0.4s ease-in-out, font-size 1s;

        &.hide-most-text {
            max-height: 32px;
            min-height: 32px;
            font-size: 10px;
        }

        p {
            margin: 15px 0;
        }

        hr {
            border: 1px solid ${({color}) => color ? color : Color.TEXT_PRIME_COLOR};
            border-radius: 50%;
        }

        p:last-of-type {
            margin-bottom: 5px;
        }
    }

`;
