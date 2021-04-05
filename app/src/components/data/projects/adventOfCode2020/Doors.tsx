import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DOOR_CONTENT} from "./DoorContent";
import Door1 from "./task/Door1";
import DoorItem from "./DoorItem";
import {Color} from "../../../config/color";
import Door2 from "./task/Door2";
import Door3 from "./task/Door3";
import Door4 from "./task/Door4";
import Door5 from "./task/Door5";

interface DoorsProps extends StyledCompProps {
  id: number
}

function Doors(props: DoorsProps) {
  const currentDoorContent = DOOR_CONTENT[props.id];
  if (currentDoorContent === undefined) {
    return null;
  }

  let doorComp = <></>;

  switch (props.id) {
    case 1:
      doorComp = <Door1/>;
      break;
    case 2:
      doorComp = <Door2/>;
      break;
    case 3:
      doorComp = <Door3/>;
      break;
    case 4:
      doorComp = <Door4/>;
      break;
    case 5:
      doorComp = <Door5/>;
      break;
  }

  return (
    <div className={props.className}>
      <h4>Aufgabe {props.id}: </h4>
      <DoorItem content={currentDoorContent.task ?? ""} translation={currentDoorContent.translated_task ?? ""}
                style={{fontFamily: "monospace"}}/>
      {!!currentDoorContent.propsForSolution &&
      <DoorItem content={currentDoorContent.propsForSolution ?? ""} color={Color.TEXT_INFO_COLOR} openPreset={false}
                style={{fontFamily: "monospace"}}/>}
      <DoorItem content={currentDoorContent.solution ?? ""} color={Color.TEXT_SUCCESS_COLOR}>
        {doorComp}
      </DoorItem>
    </div>
  );
}

export default styled(Doors)`
`;
