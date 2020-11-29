import React from 'react';
import {useKeyBoard} from "./useKeyBoard";
import {useTextCalculator} from "./useTextCalculator";
import './nameValidator.css';


function NameValidatorComponent() {
  const [userText, caretPos] = useKeyBoard('', 0);
  const textValue = useTextCalculator(userText);

  return (
    <>
      <h5>Try it and input your name {textValue > 0 && textValue}</h5>
      <div id={"the-input-field-container"}>
        <div id={"the-input-field"} className={"typewriter"}>
          <input id={"the-hidden-real-input-field"} autoFocus/>
          <p>
            {caretPos === 0 && <span id={"the-caret"}/>}
            {Array.from(userText).map((l: string, i: number) => {
              return <React.Fragment key={i}>
                {l}
                {(i === caretPos - 1) && <span id={"the-caret"}/>}
              </React.Fragment>;
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default NameValidatorComponent;
