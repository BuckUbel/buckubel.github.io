import React from "react";
import styled from "styled-components";
import { LocalStoreEntityType } from "../../hooks/useLocalStorage/LocalStoreContext";
import { StateType } from "../helper/types";
import { Color } from "../config/color";
import { TEXTCOLOR } from "../config/css";

interface InputFieldProps<T extends LocalStoreEntityType> {
  className?: string;
  name: keyof T & string;
  state: StateType<T>;
  label?: string;
}

function InputField<T extends LocalStoreEntityType>({
  className,
  name,
  state,
  label,
}: InputFieldProps<T>) {
  return (
    <div className={`${className} input-container`}>
      <span className={"input-label"}>{label + ": "}</span>
      <input name={name} type={"text"} defaultValue={"Test"} />
    </div>
  );
}

export default styled(InputField)`
  position: relative;
  width: 100%;

  .input-label {
    padding: 4px 0;
    margin-right: 4px;
    width: calc(30% - 4px);
  }

  input {
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
