import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DOOR_CONTENT} from "./DoorContent";
import Door1 from "./task/Door1";
import DoorItem from "./DoorItem";
import {Color} from "../../../config/color";
import Door2 from "./task/Door2";
import Door24 from "./task/Door24";
import Door23 from "./task/Door23";
import Door22 from "./task/Door22";
import Door21 from "./task/Door21";
import Door20 from "./task/Door20";
import Door19 from "./task/Door19";
import Door18 from "./task/Door18";
import Door17 from "./task/Door17";
import Door16 from "./task/Door16";
import Door15 from "./task/Door15";
import Door14 from "./task/Door14";
import Door13 from "./task/Door13";
import Door10 from "./task/Door10";
import Door11 from "./task/Door11";
import Door12 from "./task/Door12";
import Door4 from "./task/Door4";
import Door3 from "./task/Door3";
import Door5 from "./task/Door5";
import Door6 from "./task/Door6";
import Door7 from "./task/Door7";
import Door8 from "./task/Door8";
import Door9 from "./task/Door9";

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
    case 6:
      doorComp = <Door6/>;
      break;
    case 7:
      doorComp = <Door7/>;
      break;
    case 8:
      doorComp = <Door8/>;
      break;
    case 9:
      doorComp = <Door9/>;
      break;
    case 10:
      doorComp = <Door10/>;
      break;
    case 11:
      doorComp = <Door11/>;
      break;
    case 12:
      doorComp = <Door12/>;
      break;
    case 13:
      doorComp = <Door13/>;
      break;
    case 14:
      doorComp = <Door14/>;
      break;
    case 15:
      doorComp = <Door15/>;
      break;
    case 16:
      doorComp = <Door16/>;
      break;
    case 17:
      doorComp = <Door17/>;
      break;
    case 18:
      doorComp = <Door18/>;
      break;
    case 19:
      doorComp = <Door19/>;
      break;
    case 20:
      doorComp = <Door20/>;
      break;
    case 21:
      doorComp = <Door21/>;
      break;
    case 22:
      doorComp = <Door22/>;
      break;
    case 23:
      doorComp = <Door23/>;
      break;
    case 24:
      doorComp = <Door24/>;
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
