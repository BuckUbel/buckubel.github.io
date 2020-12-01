import React from 'react';
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";
import {Color} from "../../../config/color";

interface NameValidatorProps extends StyledCompProps {
}

const doors:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const completedDoors:number[] = [];

function AdventOfCode2020(props: NameValidatorProps) {

  return (
    <div className={props.className}>
      <p>Lasst uns beginnen!</p>
      <div className={"door-container"}>
        {doors.map((v, i) => <span key={i}
                                   className={"door " + (completedDoors.includes(v) ? "completed" : "")}>{v}</span>)}
      </div>
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
                background: ${Color.ALPHA_COLOR};
            }

            transition: box-shadow 1s, background 1s, color 1s;

            :hover {
                box-shadow: 0 0 20px -5px ${Color.BETA_COLOR};
                background: ${Color.BETA_COLOR};
                color: ${Color.TEXT_PRIME_COLOR};

            }
        }
    }

`;
