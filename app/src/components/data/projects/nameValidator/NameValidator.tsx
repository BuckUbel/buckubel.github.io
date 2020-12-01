import React, {useRef} from 'react';
import {useKeyBoard} from "./useKeyBoard";
import {useTextCalculator} from "./useTextCalculator";
import styled from 'styled-components';
import {StyledCompProps} from "../../../helper/types";

interface NameValidatorProps extends StyledCompProps {
}

function NameValidator(props: NameValidatorProps) {
  const [userText, caretPos] = useKeyBoard('', 0);
  const textValue = useTextCalculator(userText);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={props.className}>
      <h5>Try it and input your name {textValue > 0 && textValue}</h5>
      <div id={"the-input-field-container"} onClick={() => inputRef?.current?.focus()}>
        <div id={"the-input-field"} className={"typewriter"}>
          <input id={"the-hidden-real-input-field"} ref={inputRef} autoFocus/>
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
    </div>
  );
}

export default styled(NameValidator)`

    display: inline-block;

    #the-input-field-container {
        background: #000;
        border: 1px #fff solid;
        border-radius: 15px;
    }

    #the-hidden-real-input-field {
        display: none;
    }

    #the-input-field {
        background: #000;
        color: #fa0;
        text-shadow: 0 0 20px #fa0;
        max-width: 92%;
        margin: 0 auto;
        min-height: 38px;
        overflow: hidden;
    }

    .typewriter #the-caret {
        overflow: visible;
        border-right: .1em solid #fff;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: .15em;
        animation: blink-caret 0.75s step-end infinite;
        height: 38px;
    }

    /* The typewriter cursor effect */
    @keyframes blink-caret {
        from, to {
            border-color: transparent
        }
        50% {
            border-color: #fff;
        }
    }
`;
