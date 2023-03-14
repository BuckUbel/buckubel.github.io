import React from 'react';
import styled from 'styled-components';
import { StyledCompProps } from '../helper/types';
import ColorItem from './ColorItem';


interface ColorItemListProps extends StyledCompProps {
  colors: string[];
  renderText?: (color: string, index: number) => JSX.Element;
  onClick?: (index: number) => void;
  selectedIndex?: number;
  paletteSize?: number;
}

function defaultRenderText(color: string) {
  if (color === '#00000000') return <>transparent</>;
  return <>{color}</>;
}

function ColorItemList({
                         className,
                         colors,
                         paletteSize = 0,
                         onClick,
                         selectedIndex,
                         renderText = defaultRenderText
                       }: ColorItemListProps) {
  const clickOnItem = (index: number) => {
    if (!!onClick && index < paletteSize) {
      return onClick(index);
    }
  };

  return (
    <div className={className + ' color-item-list'}>
      {colors.map((color, index) => {
        return (
          <ColorItem
            key={color + index}
            color={color}
            onClick={clickOnItem(index)}
            selected={index === selectedIndex}
            disabled={index >= paletteSize}
          >
            <span>{renderText(color, index)}</span>
          </ColorItem>
        );
      })}
    </div>
  );
}

export default styled(ColorItemList)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  align-items: flex-start;
`;
