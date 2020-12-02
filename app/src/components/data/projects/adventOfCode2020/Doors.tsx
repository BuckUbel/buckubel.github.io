import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {DOOR_CONTENT} from "./DoorContent";
import TaskDescription from "./TaskDescription";
import Solution from "./Solution";
import MyPropsForSolution from "./MyPropsForSolution";
import Door1 from "./task/Door1";

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
      <TaskDescription content={currentDoorContent}/>
      {currentDoorContent.propsForSolution && <MyPropsForSolution content={currentDoorContent}/>}
      <Solution content={currentDoorContent}>
        {doorComp}
      </Solution>
    </div>
  );
}

export default styled(Doors)`
`;
