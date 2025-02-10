import React, {ChangeEvent, MutableRefObject, useEffect, useState} from "react";
import styled from "styled-components";
import {StyledCompProps} from "../../../helper/types";
import RoundButton from "../../../buttons/RoundButton";
import {Game} from "./bouncingBallsLogic";
import {Color} from "../../../config/color";

interface BouncingBallsProps extends StyledCompProps {
}

function BouncingBalls(props: BouncingBallsProps) {

  const gameFieldRef = React.useRef<HTMLDivElement>(null) ;
  const gameRef = React.useRef<Game>(null) as MutableRefObject<Game | null>;
  const [ballCounter, setBallCounter] = useState(10);
  const [ballColliding, setBallColliding] = useState(gameRef.current?.ballColliding ?? true);

  useEffect(() => {
    if (!!gameFieldRef.current) {
      const game = new Game(gameFieldRef.current);
      gameRef.current = game;
    }
  }, [gameFieldRef.current]);

  function startGame() {
    if (!!gameRef.current) {
      gameRef.current.start(ballCounter);
    }
  }
  function stopGame() {}

  function resetGame() {}

  function restartGame() {}

  function pauseGame() {
    if (!!gameRef.current) {
      gameRef.current.isRunning =!gameRef.current.isRunning
    }
  }

  function resumeGame() {}

  function toggleColliding(e:ChangeEvent<HTMLInputElement>) {
    if (!!gameRef.current) {
      gameRef.current.ballColliding = !!e.target.checked
      setBallColliding(!!e.target.checked);
    }
  }

  function toggleGravity() {
    // TODO invert gravity
    // TODO add x gravity
    // TODO additional collision handling for unknown gravity direction
  }
console.log(gameRef.current?.isExisting)
  return (
    <div className={props.className}>
      <div ref={gameFieldRef} className={"game-container"}>

      <div className={"edit-container"}>
        <div>
          <label htmlFor={"ball-counter"}>Ball Anzahl</label>
          <input
            id={"ball-counter"}
            type={"number"}
            value={ballCounter}
            onChange={(e) => setBallCounter(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor={"ball-colliding"}>Ball Kollisionen</label>
          <input
            id={"ball-colliding"}
            type={"checkbox"}
            checked={ballColliding}
            onChange={toggleColliding}
          />
        </div>
      </div>
        <RoundButton text={"Start Game"} onClick={startGame}/>
      </div>
    </div>
  );
}

export default styled(BouncingBalls)`
    .edit-container {
        padding: 8px;
        display: flex;
        flex-direction: column; /* Elemente vertikal anordnen */
        align-items: flex-start; /* Links ausrichten */
        gap: 12px; /* Abstand zwischen den Elementen */

        /* Flex-Container für Label und Input */
        > div {
            display: flex;
            align-items: center; /* Vertikal zentrieren */
            gap: 8px; /* Abstand zwischen Label und Input */
        }


        label {
            user-select: none;
            margin-right: 8px;
            width: 150px; /* Einheitliche Breite für alle Labels */
            text-align: left;
        }

        input[type="number"] {
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
        
         input[type="checkbox"] {
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border: 1px solid ${Color.TEXT_PRIME_COLOR}; /* Standard-Rahmen */
            border-radius: 5px; /* Weiche Ecken */
            outline: none;
            cursor: pointer;
            background: transparent;
            position: relative;
            box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
            transition: all 0.3s ease-in-out;

            &:checked {
                background-color: ${Color.TEXT_PRIME_COLOR}; /* Hintergrund bei Aktivierung */
                border: 5px solid rgba(0, 0, 0, 0.5);
            }

            &:focus {
                box-shadow: 0 0 40px -5px ${Color.TEXT_PRIME_COLOR};
            }
        }

    }

    .game-container {
        position: relative;
        padding: 8px;
        height: 500px;
        width: 500px;
        //border: 1px solid white;
        margin: 0 auto;

        .ball {
            box-shadow: 0 0 40px 6px currentColor;
            cursor: pointer;
            user-select: none;
        }

        .end-button {
            position: absolute;
            top: 20px;
            left: 20px;
            height: 40px;
            opacity: 0.1;
            background-color: transparent;
            color: white;
            border: 2px solid red;
            border-radius: 20px;
            cursor: pointer;
            z-index: 1000;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 0 10px red;
            transition: all 0.3s;
            padding: 10px 20px;
            user-select: none;
        }

        .end-button:hover {
            box-shadow: 0 0 20px red;
            color: red;
            opacity: 1;
        }

    }
`;
