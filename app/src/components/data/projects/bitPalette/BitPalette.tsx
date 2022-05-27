import React, {useEffect, useMemo, useState} from "react";
import {StyledCompProps} from "../../../helper/types";
import styled from "styled-components";
import {BitPaletteSizes, BitPaletteSizeType, PaletteColors} from "./constants/Palettes";
import BorderContainer from "../../../content/BorderContainer";
import ColorItemList from "../../../elements/ColorItemList";
import ColorItemGrid from "../../../elements/ColorItemGrid";
import ColorRect from "../../../elements/ColorRect";
import {getDefaultImageData} from "./constants/ImageData";
import BitPaletteTextContainer from "./BitPaletteTextContainer";
import InputField from "../../../form/InputField";
import SelectionField from "../../../form/SelectionField";

interface BitPaletteProps extends StyledCompProps {
  defaultSize?: BitPaletteSizeType;
  defaultPaletteSize?: number;
}

function BitPalette({className, defaultSize = 16, defaultPaletteSize = 8}: BitPaletteProps) {

  // TODO: Color change -> select a color and change all pixels of this to another color
  // TODO: color palettes for 4 / 8 / 16 bits && and Bitisizer adjustable palettes
  // TODO: compromizing sprites & gifs like https://pixelpalette.webfussel.de but compressor should use more chars
  // TODO: pixalizer -> Picross / Jigginator

  const imageSizeState = useState(defaultSize);
  const [imageSize, setImageSize] = imageSizeState;
  const imageDataStringState = useState("");
  const [imageDataString, setImageDataString] = imageDataStringState;

  useEffect(() => {
    setImageSize(defaultSize)
    setImageDataString(getDefaultImageData(defaultSize))
  }, []);

  useEffect(() => {
    setImageDataString(getDefaultImageData(imageSize))
  }, [imageSize]);

  const imageData = useMemo(() => {
    return imageDataString.split('').map(Number);
  }, [imageDataString])

  const paletteSizeState = useState(4);
  const [paletteSize, setPaletteSize] = paletteSizeState
  const [palette, setPalette] = useState<string[]>([]);

  useEffect(() => {
    const newPaletteSize = Math.min(defaultPaletteSize, 8)
    setPaletteSize(newPaletteSize)
    setPalette(PaletteColors.slice(0, newPaletteSize))
  }, [defaultPaletteSize]);

  const [selectedPaletteColor, setSelectedPaletteColor] = useState(0);

  const changePaletteColor = (index: number) => () => {
    setSelectedPaletteColor(index);
  }
  const changePixelColor = (index: number) => () => {
    setImageDataString((oldImageDataString) => {
      return oldImageDataString.substring(0, index) + selectedPaletteColor + oldImageDataString.substring(index + 1);
    })
  }
  const resetPixelColor = (index: number) => () => {
    setImageDataString((oldImageDataString) => {
      return oldImageDataString.substring(0, index) + 0 + oldImageDataString.substring(index + 1);
    })
  }

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
            return <ColorRect key={color + "-" + i} color={color} withoutShadow onClick={changePixelColor(i)}
                              onContextClick={resetPixelColor(i)}/>
          })}
        </ColorItemGrid>
      </BorderContainer>
      <BorderContainer>
        <InputField label={"Palettengröße"} state={paletteSizeState}/>
        <SelectionField label={"Bildgröße"} state={imageSizeState} options={BitPaletteSizes}/>
      </BorderContainer>
      <BorderContainer>
        <ColorItemList colors={palette} onClick={changePaletteColor} selectedIndex={selectedPaletteColor}/>
      </BorderContainer>
    </div>
  );
}

export default styled(BitPalette)`
  display: flex;
  flex-wrap: wrap;

  .border-container{
    max-height: 400px;
  }
  
  .color-item-list {
    margin: 20px 10px;
  }

  .color-item-grid {
    margin: 0 auto
  }
`;
