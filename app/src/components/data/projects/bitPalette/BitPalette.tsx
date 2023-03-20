import React, { useEffect, useMemo, useState } from 'react';
import { StyledCompProps } from '../../../helper/types';
import styled from 'styled-components';
import { BitPaletteSizes, BitPaletteSizeType, TemplateKeys, Templates } from './constants/Palettes';
import BorderContainer from '../../../content/BorderContainer';
import ColorItemList from '../../../elements/ColorItemList';
import ColorItemGrid from '../../../elements/ColorItemGrid';
import ColorRect from '../../../elements/ColorRect';
import { getDefaultImageData } from './constants/ImageData';
import BitPaletteTextContainer from './bitPaletteContainer/BitPaletteTextContainer';
import SelectionField from '../../../form/SelectionField';
import BitPaletteCompressedContainer from './bitPaletteContainer/BitPaletteCompressedContainer';
import { usePresetFromParams } from './hooks/usePresetFromParams';
import BitPalettePaletteContainer from './bitPaletteContainer/BitPalettePaletteContainer';

interface BitPaletteProps extends StyledCompProps {
  defaultSize?: BitPaletteSizeType;
  defaultPaletteId?: number;
  defaultPaletteSize?: number;
}

function BitPalette({ className, defaultSize = 8, defaultPaletteId = 0, defaultPaletteSize = 2 }: BitPaletteProps) {

  // TODO: Save links in localstorage
  // TODO: Add color shadow to color rects
  // TODO: Color change -> select a color and change all pixels of this to another color
  // TODO: color palettes for 4 / 8 / 16 bits && and Bitisizer adjustable palettes
  // TODO: Save pixels as image
  // TODO: compromizing sprites & gifs like https://pixelpalette.webfussel.de but compressor should use more chars
  // TODO: pixalizer -> Picross / Jigginator
  // TODO: Let the user move the pixels down, up, left and right
  // TODO: ZOOM-Edit Modal
  // TODO: Undo Redo function

  const {
    imageSizeState,
    paletteSizeState,
    imageDataStringState,
    paletteIndexState,
    templateState,
    presetImageSize,
    presetDataString,
    palettes,
    loadStateFromTemplate
  } = usePresetFromParams(defaultSize, defaultPaletteId, defaultPaletteSize);
  const [imageSize, setImageSize] = imageSizeState;
  const [paletteSize, setPaletteSize] = paletteSizeState;
  const [imageDataString, setImageDataString] = imageDataStringState;
  const [paletteIndex] = paletteIndexState;
  const blurState = useState(false);
  const [blur] = blurState;
  const [template] = templateState;

  useEffect(() => {
    if (template !== 'Custom') loadStateFromTemplate(Templates[template]);
  }, [template]);

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
    const newPaletteSize = Math.min(paletteSize, palettes[paletteIndex].length);
    setPaletteSize(newPaletteSize);
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
  const collapsedState = useState(true);

  const colorRects = useMemo(() => {
    return [...imageData].map((v: number, i) => {
      const color = palettes[paletteIndex][v];
      return <ColorRect key={color + '-' + i} color={color} withoutShadow={!blur} onClick={changePixelColor(i)}
                        onContextClick={resetPixelColor(i)} withHoverEffect />;
    });
  }, [imageDataString, blur, paletteIndex]);

  return (
    <div className={className}>
      <BorderContainer extraClassName={"image-preview-container"}
                       collapsedState={collapsedState}
      >
        <ColorItemGrid pixelSize={imageSize+"px"} size={imageSize}>{colorRects}</ColorItemGrid>
        <ColorItemGrid pixelSize={"16px"} size={imageSize}>{colorRects}</ColorItemGrid>
        <ColorItemGrid pixelSize={"32px"} size={imageSize}>{colorRects}</ColorItemGrid>
        <ColorItemGrid pixelSize={"64px"} size={imageSize}>{colorRects}</ColorItemGrid>
        <ColorItemGrid pixelSize={"128px"} size={imageSize}>{colorRects}</ColorItemGrid>
      </BorderContainer>
      <BorderContainer
        collapsedState={collapsedState}
      ></BorderContainer>
      <BorderContainer><ColorItemGrid size={imageSize}>{colorRects}</ColorItemGrid></BorderContainer>
      <BorderContainer>
        <div className={'bitpalette-settings-container'}>
          <SelectionField label={'Palettengröße'} state={paletteSizeState} options={[2, 3, 4, 5, 6, 7, 8]} />
          <SelectionField label={'Bildgröße'} state={imageSizeState} options={BitPaletteSizes} />
          <SelectionField label={'Verwaschen'} state={blurState} options={[true, false]} />
          <SelectionField label={'Template'} state={templateState} options={TemplateKeys} />
        </div>
      </BorderContainer>
      <BorderContainer>
        <ColorItemList colors={palettes[paletteIndex]} onClick={changePaletteColor} paletteSize={paletteSize}
                       selectedIndex={selectedPaletteColor} />
      </BorderContainer>
      <BitPalettePaletteContainer palettes={palettes} paletteIndexState={paletteIndexState} paletteSize={paletteSize} />
      <BitPaletteTextContainer
        dataStringState={imageDataStringState}
        imageSize={imageSize}
        paletteSize={paletteSize}
        collapsedState={collapsedState}
      />
      <BitPaletteCompressedContainer
        dataStringState={imageDataStringState}
        paletteSize={paletteSize}
        imageSize={imageSize}
        collapsedState={collapsedState}
      />

    </div>
  );
}

export default styled(BitPalette)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  .border-container {
    max-height: 400px;
  }

  .image-preview-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
