import React from "react";
import styled from "styled-components";
import { StyledCompProps } from "../helper/types";
import { Color } from "../config/color";

interface BorderContainerProps extends StyledCompProps {
  extraClassName?: string;
}

function BorderContainer({
  className,
  extraClassName = "",
  children,
}: BorderContainerProps) {
  return <div className={className + " " + extraClassName}>{children}</div>;
}

export default styled(BorderContainer)`
  border: 1px solid ${Color.TEXT_PRIME_COLOR};
  box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
  background: ${Color.PRIME_COLOR};
  color: ${Color.TEXT_PRIME_COLOR};

  width: calc(50% - 12px);
  display: inline-block;
  vertical-align: top;
  min-height: 150px;
  max-height: 450px;
  overflow: auto;
  padding: 10px 5px;
`;
