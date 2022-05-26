import React, {ChangeEvent, KeyboardEventHandler, useEffect, useMemo, useRef, useState} from "react";
import {StyledCompProps} from "../../../helper/types";
import styled from "styled-components";
import {ImageData16, ImageData32, ImageData64, ImageData8} from "./constants/ImageData";
import {PaletteColors} from "./constants/Palettes";
import BorderContainer from "../../../content/BorderContainer";
import ColorItemList from "../../../elements/ColorItemList";
import ColorItemGrid from "../../../elements/ColorItemGrid";
import ColorRect from "../../../elements/ColorRect";
import {Color} from "../../../config/color";

type BitPaletteSizes = 8 | 16 | 32 | 64

function getDefaultImageData(newSize: BitPaletteSizes) {
  switch (newSize) {
    case 8:
      return ImageData8;
    case 16:
      return ImageData16;
    case 32:
      return ImageData32;
    case 64:
      return ImageData64;
  }
}

const DEFAULT_TEXTAREA_INPUTS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "F5"]

function getSafeText(text: string, paletteSize: number) {
  if (!/^\d+$/.test(text)) return "";
  const segments = text.split("");
  return segments.map((num) => {
    if (Number(num) > paletteSize) {
      return "0";
    }
    return num;
  }).join("");
}

interface BitPaletteProps extends StyledCompProps {
  defaultSize?: BitPaletteSizes;
  defaultPaletteSize?: number;
}

function BitPalette({className, defaultSize = 16, defaultPaletteSize = 8}: BitPaletteProps) {

  // TODO: Color change -> select a color and change all pixels of this to another color
  // TODO: color palettes for 4 / 8 / 16 bits && and Bitisizer adjustable palettes
  // TODO: compromizing sprites & gifs like https://pixelpalette.webfussel.de but compressor should use more chars
  // TODO: pixalizer -> Picross / Jigginator

  const [imageSize, setImageSize] = useState(defaultSize);
  const [imageDataString, setImageDataString] = useState("");

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

  const [paletteSize, setPaletteSize] = useState(4);
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

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (newChar: string, completeString: string) => {
    if (!!textAreaRef.current) {
      const selectionStart = textAreaRef.current.selectionStart;
      const selectionEnd = textAreaRef.current.selectionEnd;
      const leftValue = completeString.substring(0, selectionStart - 1)

      const maxSize = imageDataString.length;
      let rightValueStart = selectionStart + newChar.length;
      const hasSelection = Math.min(0, maxSize - completeString.length) === 0;
      if (hasSelection) {
        rightValueStart -= 1;
      }
      const rightValue = completeString.substring(rightValueStart, maxSize + 1)

      let newValue = leftValue;
      const selectionDifference = Math.max(0, maxSize - completeString.length);
      for (let i = 0; i <= selectionDifference; i++) {
        newValue += newChar
      }
      newValue += rightValue;
      newValue = newValue.slice(0, maxSize);
      setImageDataString(newValue);

      let newSelectionStart = textAreaRef.current.selectionEnd + selectionDifference;
      if (selectionEnd >= imageSize * imageSize || selectionStart >= imageSize * imageSize) {
        newSelectionStart = 0;
      }
      textAreaRef.current.value = newValue;
      textAreaRef.current.setSelectionRange(newSelectionStart, newSelectionStart);
    }
  }

  const changeColorManually = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!!(event.nativeEvent as any).data) {
      const newInput = (event.nativeEvent as any).data.slice(0, 1);
      let completeValue = event.target.value
      insertText(newInput, completeValue)
    }
  }
  const ignoreSomeKeyEvents: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const isCopyOrPaste = event.ctrlKey && (event.key === 'v' || event.key === 'c' || event.key === 'a');
    if (DEFAULT_TEXTAREA_INPUTS.includes(event.key) || isCopyOrPaste) {
      return true
    }
    if (Number(event.key) > -1 && Number(event.key) < paletteSize) {
      return true;
    }
    event.preventDefault()
    event.isPropagationStopped()
    return false;
  }
  return (
    <div className={className}>
      <BorderContainer>
        <textarea
          ref={textAreaRef}
          className={"image-value-textarea"}
          value={imageDataString}
          cols={imageSize}
          rows={imageSize}
          onChange={changeColorManually}
          onKeyDown={ignoreSomeKeyEvents}
          onPaste={(e) => {
            navigator.clipboard.readText().then((pastedText) => {
              const safePastedText = getSafeText(pastedText, paletteSize);
              if (!!textAreaRef.current && safePastedText !== "") {
                safePastedText.split("").forEach((char) => {
                  if (!!textAreaRef.current && safePastedText !== "") {
                    const pasteStart = textAreaRef.current.selectionStart;
                    textAreaRef.current.selectionStart = pasteStart + 1;
                    textAreaRef.current.selectionEnd = pasteStart + 1;
                    let completeValue = (e.target as any).value ?? ""
                    insertText(char, completeValue)
                    textAreaRef.current.selectionStart = pasteStart + char.length;
                    textAreaRef.current.selectionEnd = pasteStart + char.length;
                  }
                })
              }
            })
            e.preventDefault()
            return false;
          }}
        />
        <p className={"image-value-display"}>
          {imageDataString}
        </p>
      </BorderContainer>
      <BorderContainer>
        <ColorItemList colors={palette} onClick={changePaletteColor} selectedIndex={selectedPaletteColor}/>
      </BorderContainer>
      <BorderContainer>
        <ColorItemGrid size={imageSize}>
          {[...imageData].map((v: number, i) => {
            const color = palette[v];
            return <ColorRect key={color + "-" + i} color={color} withoutShadow onClick={changePixelColor(i)}
                              onContextClick={resetPixelColor(i)}/>
          })}
        </ColorItemGrid>
      </BorderContainer>
    </div>
  );
}

export default styled(BitPalette)`
  display: flex;
  flex-wrap: wrap;

  .image-value-display {
    display: inline-block;
    vertical-align: top;
    padding: 10px;
    margin: 20px 10px;

    width: 72px;
    word-break: break-all;
    font-family: monospace;
  }

  .image-value-textarea {
    display: inline-block;
    vertical-align: top;
    resize: none;
    width: 72px;
    font-size: 16px;
    padding: 10px;
    margin: 20px 10px;
    overflow: hidden;
    background: transparent;
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    color: ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 12px 2px ${Color.TEXT_PRIME_COLOR};
  }

  .color-item-list {
    margin: 20px 10px;
  }

  .color-item-grid {
    margin: 0 auto
  }
`;
