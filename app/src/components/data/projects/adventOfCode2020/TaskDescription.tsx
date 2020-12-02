import React, {useState} from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DoorContentInterface} from "./DoorContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faLanguage} from '@fortawesome/free-solid-svg-icons'
import RoundButton from "../../../buttons/RoundButton";
import {Color} from "../../../config/color";
import {crlfToP} from "../../../helper/crlfToP";

interface TaskDescriptionProps extends StyledCompProps {
  content: DoorContentInterface;
}

function TaskDescription(props: TaskDescriptionProps) {

  const [translated, setTranslated] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <div className={props.className}>
      <RoundButton onClick={() => setTranslated(!translated)}
                   text={<FontAwesomeIcon icon={faLanguage}/>} width={"10%"}/>
      <div className={"close-button"} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon size={"2x"} icon={open ? faChevronUp : faChevronDown}/>
      </div>
      <div className={"task-description " + (!open ? "hide-most-text":"")}>
        {translated && props.content.translated_task !== "" && crlfToP(props.content.translated_task)}
        {!translated && props.content.task !== "" && crlfToP(props.content.task)}
      </div>
    </div>
  );
}

export default styled(TaskDescription)`
    width: 100%;

    .round-button {
        vertical-align: top;
    }

    .close-button {
        display: inline-block;
        vertical-align: top;
        padding: 10px;
    }

    .task-description {
        width: 80%;
        max-width: 648px;
        max-height: 2000px;
        min-height: 48px;
        display: inline-block;
        text-align: left;
        vertical-align: top;
        padding: 10px;
        border: 1px solid ${Color.TEXT_PRIME_COLOR};
        overflow: hidden;

        font-size: 14px;

        transition: max-height 0.4s ease-in-out, font-size 1s;

        &.hide-most-text {
            max-height: 50px;
            font-size: 10px;

        }

        p {
            margin: 15px 0;
        }

        p:last-of-type {
            margin-bottom: 5px;
        }
    }

`;
