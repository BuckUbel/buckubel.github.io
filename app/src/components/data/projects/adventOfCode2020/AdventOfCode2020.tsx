import React, {useState} from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {Color} from "../../../config/color";
import Doors from "./Doors";
import {COMPLETED_DOOR_NUMBERS, STARTED_DOOR_NUMBERS} from "./DoorContent";

interface NameValidatorProps extends StyledCompProps {
}

const doors: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function AdventOfCode2020(props: NameValidatorProps) {

  const [openedDoor, setOpenedDoor] = useState(-1);
  return (
    <div className={props.className}>
      <div className={"door-container " + (openedDoor !== -1 ? "door-is-selected" : "")}>
        {doors.map((v, i) => {
          const isStarted = STARTED_DOOR_NUMBERS.includes(v);
          const isCompleted = COMPLETED_DOOR_NUMBERS.includes(v);
          return <span key={i}
                       className={"door " +
                           (isCompleted ? "completed " : (isStarted? "started " :"")) +
                           (openedDoor === v ? "selected" : "")
                       }
                       onClick={() => {
                         if (isStarted || isCompleted) {
                           setOpenedDoor(v)
                         }
                       }}>
            {v}
          </span>
        })}
      </div>
      <Doors id={openedDoor}/>
    </div>
  );
}

export default styled(AdventOfCode2020)`
    text-align: center;

    .door-container {
        max-width: 552px;
        display: inline-block;

        .door {
            width: 50px;
            height: 50px;
            padding: 10px;
            margin: 10px;
            display: inline-block;
            border: 1px solid ${Color.TEXT_PRIME_COLOR};
            box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
            background: ${Color.PRIME_COLOR};
            color: ${Color.TEXT_PRIME_COLOR};
            line-height: 50px;

            &.completed {
                border: 1px solid ${Color.TEXT_SUCCESS_COLOR};
                box-shadow: 0 0 20px -5px ${Color.TEXT_SUCCESS_COLOR};
                color: ${Color.TEXT_SUCCESS_COLOR};
            }
            
            &.started {
               border: 1px solid ${Color.TEXT_INFO_COLOR};
               box-shadow: 0 0 20px -5px ${Color.TEXT_INFO_COLOR};
               color: ${Color.TEXT_INFO_COLOR};
            }

            &.selected {
                background: ${Color.GAMMA_COLOR};
            }

            transition: box-shadow 1s, background 1s, color 1s;

            :hover {
                box-shadow: 0 0 20px -5px ${Color.BETA_COLOR};
                background: ${Color.BETA_COLOR};
                color: ${Color.TEXT_PRIME_COLOR};

            }
        }

        &.door-is-selected {
            max-width: 648px;

            .door {
                width: 25px;
                height: 25px;
                line-height: 25px;
                padding: 0;
                margin: 0;
            }
        }
    }

`;
