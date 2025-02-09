import React, {useState} from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../helper/types";
import RoundButton from "../../../buttons/RoundButton";
import {Game} from "./bouncingBallsLogic";
import {Color} from "../../../config/color";

interface BouncingBallsProps extends StyledCompProps {
}

function BouncingBalls(props: BouncingBallsProps) {

  const [ballCounter, setBallCounter] = useState(2);

  function startGame() {
    const game = new Game();
    game.start(ballCounter);
  }

  return (
    <div className={props.className}>
      <div className={"edit-container"}>
        <label htmlFor={"ball-counter"} >Ball Anzahl</label>
        <input
          id={"ball-counter"}
          type={"number"}
          value={ballCounter}
          onChange={(e) => setBallCounter(Number(e.target.value))}
        />
      </div>
      <div className={"game-container"}>
        <RoundButton text={"Start Game"} onClick={startGame}/>
      </div>
    </div>
  );
}

export default styled(BouncingBalls)`
    .edit-container {
        padding: 8px;

        label {
            user-select: none;
            margin-right: 8px;
        }

        input {
            background: transparent; /* Transparenter Hintergrund */
            color: white; /* Weiße Schrift */
            border-radius: 5px; /* Abgerundete Ecken für den Rahmen */
            padding: 10px; /* Polsterung innen */
            font-size: 16px; /* Schriftgröße */
            outline: none; /* Keine Umrandung beim Fokussieren */
            box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
            border: 1px solid ${Color.TEXT_PRIME_COLOR};

            transition: padding 1s, border-size 1s, box-shadow 0.3s ease-in-out; /* Sanfter Übergang für den leuchtenden Effekt */
            text-align: center;
            &:focus {
                box-shadow: 0 0 40px -5px ${Color.TEXT_PRIME_COLOR};
                border: 2px solid ${Color.TEXT_PRIME_COLOR};
                padding: 12px;
                
            }

            -moz-appearance: textfield; /* Für Firefox */
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

        }
    }

    .game-container {
        padding: 8px;

    }
`;
