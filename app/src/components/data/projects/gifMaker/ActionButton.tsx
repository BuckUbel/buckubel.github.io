import React, { CSSProperties, RefObject } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledCompProps } from "../../../helper/types";
import { IconName } from "@fortawesome/fontawesome-common-types";
import { Color } from "../../../config/color";

interface ActionButtonProps extends StyledCompProps {
  icon: IconName;
  onClick: () => void;
  style?: CSSProperties;
  size?: number;
}

function ActionButton({ className, style, onClick, icon }: ActionButtonProps) {
  return (
    <button className={className} style={style} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default styled(ActionButton)`
  width: ${({ size }) => size ?? 20}px;
  height: ${({ size }) => size ?? 20}px;
  font-size: ${({ size }) => (size ? (size * 2) / 3 : 20)}px;
  color: ${Color.TEXT_PRIME_COLOR};
  background: ${Color.TEXT_ERROR_COLOR};
  cursor: pointer;
  border-radius: 20px;
  display: inline-block;
  margin: 2px;
  padding: 2px;
  border: none;
  box-sizing: content-box;
`;
