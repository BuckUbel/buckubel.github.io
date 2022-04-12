import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledCompProps } from "../../../helper/types";
import { Color } from "../../../config/color";
import { IconLookup } from "@fortawesome/fontawesome-common-types";

export interface ElementToUseProps extends StyledCompProps {
  onClick?: () => void;
}

interface TextButtonProps extends ElementToUseProps {
  ElementToUse: React.ComponentType<ElementToUseProps>;
  icons: IconLookup[];
  content?: string;
  disabled?: boolean;
}

function TextButton({
  ElementToUse = (props: ElementToUseProps) => <button {...props} />,
  icons = [],
  disabled = false,
  content = "",
  children,
  onClick,
  ...elementToUseProps
}: TextButtonProps) {
  const onClickHandler = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <ElementToUse onClick={onClickHandler} {...elementToUseProps}>
      {icons.map((icon) => (
        <FontAwesomeIcon key={icon.iconName} icon={icon} />
      ))}
      {content.length > 0 && <p>{content}</p>}
      {children}
    </ElementToUse>
  );
}

export default styled(TextButton)`
  display: inline-block;
  padding: 4px 8px;
  margin: 5px;
  border-radius: 20px;
  border: none;
  color: ${({ disabled }) =>
    disabled ? Color.TEXT_GREY_COLOR : Color.TEXT_PRIME_COLOR};
  background: ${({ disabled }) =>
    disabled ? Color.TEXT_DISABLE_COLOR : Color.BETA_COLOR};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  p {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
  }
`;
