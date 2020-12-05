import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DOOR_CONTENT} from "./DoorContent";
import Door1 from "./task/Door1";
import DoorItem from "./DoorItem";
import {Color} from "../../../config/color";

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
  }

  return (
    <div className={props.className}>
      <h4>Aufgabe 1: </h4>
      <DoorItem content={currentDoorContent.task ?? ""} translation={currentDoorContent.translated_task ?? ""}/>
      {!!currentDoorContent.propsForSolution &&
      <DoorItem content={currentDoorContent.propsForSolution ?? ""} color={Color.TEXT_INFO_COLOR} openPreset={false}/>}
      <DoorItem content={currentDoorContent.solution ?? ""} color={Color.TEXT_SUCCESS_COLOR}>
        {doorComp}
      </DoorItem>
    </div>
  );
}

export default styled(Doors)`
`;
