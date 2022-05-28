import React, {ChangeEventHandler} from "react";
import styled from "styled-components";
import {StateType} from "../helper/types";
import {Color} from "../config/color";
import {TEXTCOLOR} from "../config/css";

interface InputFieldProps<T> {
  className?: string;
  state: StateType<T>;
  isValid?: (value: T) => boolean;
  label?: string;
  type?:"text" | "number" | "date" | "color";
}

function InputField<T extends string | number>({
  className,
  state,
  label,
  isValid,
  type = "text"
}: InputFieldProps<T>) {
  const [value, setValue] = state;
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const newValue = ev.target.value as T;
    if (!!isValid && isValid(newValue)) {
      setValue(newValue);
    }
    if (!isValid) {
      setValue(newValue);
    }
  }
  return (
    <div className={`${className} input-container`}>
      <span className={"input-label"}>{label + ": "}</span>
      <input type={type} value={value} onChange={onChange}/>
    </div>
  );
}

export default styled(InputField)`
  position: relative;
  width: 100%;

  .input-label {
    display: inline-block;
    vertical-align: middle;
    padding: 4px 0;
    margin-right: 4px;
    width: calc(30% - 6px);
  }

  input {
    display: inline-block;
    vertical-align: middle;
    padding: 6px;
    font-size: 14px;
    height: 16px;
    width: calc(70% - 12px);

    background: #000;
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
  }
` as typeof InputField;
