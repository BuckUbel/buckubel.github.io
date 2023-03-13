import React, { useEffect, useMemo, useState } from 'react';
import { StyledCompProps } from '../../../helper/types';
import styled from 'styled-components';
import { BitPaletteSizes, BitPaletteSizeType, PaletteColors } from './constants/Palettes';
import BorderContainer from '../../../content/BorderContainer';
import ColorItemList from '../../../elements/ColorItemList';
import ColorItemGrid from '../../../elements/ColorItemGrid';
import ColorRect from '../../../elements/ColorRect';
import { getDefaultImageData } from './constants/ImageData';
import BitPaletteTextContainer from './bitPaletteContainer/BitPaletteTextContainer';
import SelectionField from '../../../form/SelectionField';
import BitPaletteCompressedContainer from './bitPaletteContainer/BitPaletteCompressedContainer';
import { usePresetFromParams } from './hooks/usePresetFromParams';

interface BitPaletteProps extends StyledCompProps {
  defaultSize?: BitPaletteSizeType;
  defaultPaletteSize?: number;
}

function BitPalette({ className, defaultSize = 8, defaultPaletteSize = 2 }: BitPaletteProps) {

  // TODO: Save links in localstorage
  // TODO: Change optic focus to image instead bits - hide them in modals
  // TODO: Add color shadow to color rects
  // TODO: Color change -> select a color and change all pixels of this to another color
  // TODO: color palettes for 4 / 8 / 16 bits && and Bitisizer adjustable palettes
  // TODO: Save pixels as image
  // TODO: compromizing sprites & gifs like https://pixelpalette.webfussel.de but compressor should use more chars
  // TODO: pixalizer -> Picross / Jigginator


  const {
    imageSizeState,
    paletteSizeState,
    imageDataStringState,
    presetImageSize,
    presetDataString
  } = usePresetFromParams(defaultSize, defaultPaletteSize);
  const [imageSize, setImageSize] = imageSizeState;
  const [paletteSize, setPaletteSize] = paletteSizeState;
  const [imageDataString, setImageDataString] = imageDataStringState;
  const [palette, setPalette] = useState<string[]>([]);

  useEffect(() => {
    setImageSize(presetImageSize);
    if (!presetDataString) {
      setImageDataString(getDefaultImageData(presetImageSize));
    }
  }, [presetDataString]);

  useEffect(() => {
    if (!presetDataString) {
      setImageDataString(getDefaultImageData(presetImageSize));
    }
  }, [imageSize, presetDataString]);

  const imageData = useMemo(() => {
    return imageDataString.split('').map(Number);
  }, [imageDataString]);

  useEffect(() => {
    const newPaletteSize = Math.min(paletteSize, PaletteColors.length);
    setPaletteSize(newPaletteSize);
    setPalette(PaletteColors.slice(0, newPaletteSize));
  }, [paletteSize]);

  const [selectedPaletteColor, setSelectedPaletteColor] = useState(1);

  const changePaletteColor = (index: number) => () => {
    setSelectedPaletteColor(index);
  };
  const changePixelColor = (index: number) => () => {
    setImageDataString((oldImageDataString) => {
      return oldImageDataString.substring(0, index) + selectedPaletteColor + oldImageDataString.substring(index + 1);
    });
  };
  const resetPixelColor = (index: number) => () => {
    setImageDataString((oldImageDataString) => {
      return oldImageDataString.substring(0, index) + 0 + oldImageDataString.substring(index + 1);
    });
  };

  return (
    <div className={className}>
      <BitPaletteTextContainer
        dataStringState={imageDataStringState}
        imageSize={imageSize}
        paletteSize={paletteSize}
      />
      <BorderContainer>
        <ColorItemGrid size={imageSize}>
          {[...imageData].map((v: number, i) => {
            const color = palette[v];
            return <ColorRect key={color + '-' + i} color={color} withoutShadow onClick={changePixelColor(i)}
                              onContextClick={resetPixelColor(i)} />;
          })}
        </ColorItemGrid>
      </BorderContainer>
      <BorderContainer>
        <div className={'bitpalette-settings-container'}>
          <SelectionField label={'Palettengröße'} state={paletteSizeState} options={[2, 3, 4, 5, 6, 7, 8]} />
          <SelectionField label={'Bildgröße'} state={imageSizeState} options={BitPaletteSizes} />
        </div>
      </BorderContainer>
      <BorderContainer>
        <ColorItemList colors={palette} onClick={changePaletteColor} selectedIndex={selectedPaletteColor} />
      </BorderContainer>
      <BitPaletteCompressedContainer
        dataStringState={imageDataStringState}
        paletteSize={paletteSize}
        imageSize={imageSize}
      />
    </div>
  );
}

export default styled(BitPalette)`
  display: flex;
  flex-wrap: wrap;

  .border-container {
    max-height: 400px;
  }

  .bitpalette-settings-container {
    margin: 20px 10px;
  }

  .color-item-list {
    margin: 20px 10px;
  }

  .color-item-grid {
    margin: 0 auto
  }
`;
