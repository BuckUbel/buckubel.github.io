import React, { useRef } from "react";
import { useKeyBoard } from "./useKeyBoard";
import { useTextCalculator } from "./useTextCalculator";
import styled from "styled-components";
import { StyledCompProps } from "../../../helper/types";
import { Color } from "../../../config/color";

interface NameValidatorProps extends StyledCompProps {}

function NameValidator(props: NameValidatorProps) {
  const [userText, caretPos] = useKeyBoard("", 0);
  const textValue = useTextCalculator(userText);

  const inputRef = useRef<HTMLInputElement>(null);
  const isHundred = textValue > 0 && textValue % 100 === 0;

  return (
    <div className={props.className}>
      <h5>Try it and input your name</h5>
      <div
        id={"the-input-field-container"}
        className={isHundred ? " hundred" : ""}
        onClick={() =>
          setTimeout(() => {
            inputRef?.current?.focus();
          }, 1)
        }
      >
        <div id={"the-input-field"} className={"typewriter"}>
          <input
            id={"the-hidden-real-input-field"}
            ref={inputRef}
            autoFocus
            autoComplete={"off"}
            type={"text"}
          />
          <p>
            {caretPos === 0 && <span id={"the-caret"} />}
            {Array.from(userText).map((l: string, i: number) => {
              return (
                <React.Fragment key={i}>
                  {l}
                  {i === caretPos - 1 && <span id={"the-caret"} />}
                </React.Fragment>
              );
            })}
          </p>
        </div>
      </div>
      <h2 id={"input-field-value"} className={isHundred ? " hundred" : ""}>
        {textValue}
      </h2>
    </div>
  );
}

export default styled(NameValidator)`
  display: inline-block;

  #the-input-field-container {
    background: #000;
    border: 1px #fff solid;
    border-radius: 15px;

    #the-input-field {
      color: #fa0;
      text-shadow: 0 0 20px #fa0;
      max-width: 92%;
      margin: 0 auto;
      min-height: 38px;
      overflow: hidden;
      position: relative;
      border: 0;
    }

    &.hundred {
      border: 1px solid ${Color.TEXT_SUCCESS_COLOR};
      box-shadow: 0 0 20px -5px ${Color.TEXT_SUCCESS_COLOR};
      color: ${Color.TEXT_SUCCESS_COLOR};

      #the-input-field {
        color: ${Color.TEXT_SUCCESS_COLOR};
        text-shadow: 0 0 20px ${Color.TEXT_SUCCESS_COLOR};
      }
    }
  }

  #input-field-value.hundred {
    color: ${Color.TEXT_SUCCESS_COLOR};
    text-shadow: 0 0 20px ${Color.TEXT_SUCCESS_COLOR};
  }

  #the-hidden-real-input-field {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
      background: rgba(255, 255, 255, 0.01); /* Minimal transparenter Hintergrund */
      color: rgba(255, 255, 255, 0.01); /* Minimal transparente Schriftfarbe */
      font-size: 16px; /* Mindestgröße für mobile Inputs */
    border: 0;
    :focus {
      outline: none;
    }
  }

  .typewriter #the-caret {
    overflow: visible;
    border-right: 0.1em solid #fff;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: blink-caret 0.75s step-end infinite;
    height: 38px;
  }

  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #fff;
    }
  }
`;
