import React from 'react';
import ColorRect from './ColorRect';
import { StyledCompProps } from '../helper/types';
import styled from 'styled-components';
import { Color } from '../config/color';

interface ColorRectListProps extends StyledCompProps {
  palette: string[];
  paletteSize: number;
  onClick?: ()=>void;
}

function ColorRectList({ className, palette, paletteSize, onClick }: ColorRectListProps) {
  return (
    <div className={className} onClick={onClick}>
      {palette.map((color, index) => {
        if (index >= paletteSize) return null;
        return <ColorRect
          key={color + '-' + index}
          color={color}
          onClick={() => {
          }}
          onContextClick={() => {
          }}
        />;
      })}
    </div>
  );
}

export default styled(ColorRectList)`
  position: relative;
  box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};
  border: 1px solid transparent;
  background: ${Color.PRIME_COLOR};
  color: ${Color.TEXT_PRIME_COLOR};
  margin: 5px 0;
  height: 30px;
  
  .color-rect {
    margin: 5px;
  }

  :hover {
    background: ${Color.BETA_COLOR};
  }
`;
