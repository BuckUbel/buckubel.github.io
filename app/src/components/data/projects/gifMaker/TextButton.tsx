import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledCompProps } from '../../../helper/types';
import { Color } from '../../../config/color';
import { IconLookup } from '@fortawesome/fontawesome-common-types';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface ElementToUseProps extends StyledCompProps {
  onClick?: () => void;
  extraClassName?: string;
}

interface TextButtonProps extends ElementToUseProps {
  ElementToUse: React.ComponentType<ElementToUseProps>;
  icons: IconLookup[];
  content?: string;
  disabled?: boolean;
  background?: string;
}

function TextButton({
                      ElementToUse = (props: ElementToUseProps) => <button {...props} />,
                      icons = [],
                      disabled = false,
                      content = '',
                      children,
                      onClick,
                      extraClassName,
                      ...elementToUseProps
                    }: TextButtonProps) {
  const onClickHandler = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <ElementToUse className={elementToUseProps.className + ' ' + extraClassName}
                  onClick={onClickHandler} {...elementToUseProps}>
      {icons.map((icon) => (
        <FontAwesomeIcon key={icon.iconName} icon={icon as IconProp} />
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
  background: ${({ disabled, background }) =>
          disabled ? Color.TEXT_DISABLE_COLOR : background ?? Color.BETA_COLOR};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

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
