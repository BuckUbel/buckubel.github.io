import * as React from 'react';
import { StateType, StyledCompProps } from '../../../../helper/types';
import styled from 'styled-components';
import BorderContainer from '../../../../content/BorderContainer';
import ColorRectList from '../../../../elements/ColorRectList';
import { Color } from '../../../../config/color';


interface BitPalettePaletteContainerProps extends StyledCompProps {
  palettes: string[][];
  paletteIndexState: StateType<number>;
  paletteSize: number;
}

function BitPalettePaletteContainer({
                                      className,
                                      palettes,
                                      paletteIndexState,
                                      paletteSize
                                    }: BitPalettePaletteContainerProps) {


  const [paletteIndex, setPaletteIndex] = paletteIndexState;
  return (
    <BorderContainer extraClassName={className}>
      {palettes.map((p, index) => {
        const thisPalette = p.slice(0, paletteSize);
        let className = '';
        if (index === paletteIndex) {
          className = 'selected-palette';
        }
        return <ColorRectList
          key={index}
          className={className}
          paletteSize={paletteSize}
          palette={thisPalette}
          onClick={() => {
            setPaletteIndex(index);
          }}
        />;
      })}
    </BorderContainer>
  );
}

export default styled(BitPalettePaletteContainer)`

  .color-rect {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .selected-palette {
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
  }
`;
