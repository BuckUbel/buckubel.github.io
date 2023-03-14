import React, { ChangeEvent, ClipboardEventHandler, KeyboardEventHandler, useRef } from 'react';
import { StateType, StyledCompProps } from '../../../../helper/types';
import styled from 'styled-components';
import { BitPaletteSizeType } from '../constants/Palettes';
import BorderContainer from '../../../../content/BorderContainer';
import { Color } from '../../../../config/color';
import { CTRL_TEXTAREA_INPUTS, DEFAULT_TEXTAREA_INPUTS } from '../constants/Default';
import { getSafePasteText } from '../helper/getSafePasteText';
import '../../gifMaker/ActionButton';
import { getRandomInt } from '../../../../helper/math';
import { getDefaultImageData } from '../constants/ImageData';
import TextButton from '../../gifMaker/TextButton';
import { faChessBoard, faTrash } from '@fortawesome/free-solid-svg-icons';
import ColumnsContainer from '../../../../grid/ColumnsContainer';


interface BitPaletteTextContainerProps extends StyledCompProps {
  dataStringState: StateType<string>;
  imageSize: BitPaletteSizeType;
  paletteSize: number;
  collapsedState: StateType<boolean>;
}

function BitPaletteTextContainer({
                                   className,
                                   dataStringState,
                                   imageSize,
                                   paletteSize,
                                   collapsedState
                                 }: BitPaletteTextContainerProps) {

  const [imageDataString, setImageDataString] = dataStringState;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (newChar: string, completeString: string) => {
    if (!!textAreaRef.current) {
      const selectionStart = textAreaRef.current.selectionStart;
      const selectionEnd = textAreaRef.current.selectionEnd;
      const leftValue = completeString.substring(0, selectionStart - 1);

      const maxSize = imageDataString.length;
      let rightValueStart = selectionStart + newChar.length;
      const hasSelection = Math.min(0, maxSize - completeString.length) === 0;
      if (hasSelection) {
        rightValueStart -= 1;
      }
      const rightValue = completeString.substring(rightValueStart, maxSize + 1);

      let newValue = leftValue;
      const selectionDifference = Math.max(0, maxSize - completeString.length);
      for (let i = 0; i <= selectionDifference; i++) {
        newValue += newChar;
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
  };

  const changeColorManually = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!!(event.nativeEvent as any).data) {
      const newInput = (event.nativeEvent as any).data.slice(0, 1);
      let completeValue = event.target.value;
      insertText(newInput, completeValue);
    }
  };
  const ignoreSomeKeyEvents: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const isCopyOrPaste = event.ctrlKey && CTRL_TEXTAREA_INPUTS.includes(event.key);
    if (DEFAULT_TEXTAREA_INPUTS.includes(event.key) || isCopyOrPaste) {
      return true;
    }
    if (Number(event.key) > -1 && Number(event.key) < paletteSize) {
      return true;
    }
    event.preventDefault();
    event.isPropagationStopped();
    return false;
  };

  const modifyPastedText: ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    navigator.clipboard.readText().then((pastedText) => {
      const safePastedText = getSafePasteText(pastedText, paletteSize);
      if (!!textAreaRef.current && safePastedText !== '') {
        safePastedText.split('').forEach((char) => {
          if (!!textAreaRef.current && safePastedText !== '') {
            const pasteStart = textAreaRef.current.selectionStart;
            textAreaRef.current.selectionStart = pasteStart + 1;
            textAreaRef.current.selectionEnd = pasteStart + 1;
            let completeValue = (e.target as any).value ?? '';
            insertText(char, completeValue);
            textAreaRef.current.selectionStart = pasteStart + char.length;
            textAreaRef.current.selectionEnd = pasteStart + char.length;
          }
        });
      }
    });
    e.preventDefault();
    return false;
  };

  return (
    <BorderContainer extraClassName={className} collapsedState={collapsedState}>
      <ColumnsContainer flexDirection={'column'}>
        <TextButton content={'Randomize'} icons={[faChessBoard]} onClick={() => {
          let newValue = '';
          for (let i = 0; i < imageSize * imageSize; i++) {
            const paletteId = getRandomInt(0, paletteSize - 1);
            newValue += paletteId;
          }
          setImageDataString(newValue);
        }} />
        <TextButton
          content={'Reset Data'}
          icons={[faTrash]}
          background={Color.TEXT_ERROR_COLOR}
          onClick={() => setImageDataString(getDefaultImageData(imageSize))}
        />
      </ColumnsContainer>
      <textarea
        ref={textAreaRef}
        className={'image-value-textarea'}
        value={imageDataString}
        cols={imageSize}
        rows={imageSize}
        onChange={changeColorManually}
        onKeyDown={ignoreSomeKeyEvents}
        onPaste={modifyPastedText}
      />
    </BorderContainer>
  );
}

function getWidth({ imageSize }: BitPaletteTextContainerProps) {
  return 2 + imageSize / 8 * 70 + 'px';
}

export default styled(BitPaletteTextContainer)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;

  .image-value-display {
    display: inline-block;
    vertical-align: top;
    padding: 10px;
    margin: 20px 10px;

    width: ${getWidth};
    word-break: break-all;
    font-family: monospace;
  }

  .image-value-textarea {
    display: inline-block;
    vertical-align: top;
    resize: none;
    width: ${getWidth};
    font-size: 16px;
    padding: 10px;
    margin: 5px 10px 20px;

    overflow: hidden;
    background: transparent;
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    color: ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 12px 2px ${Color.TEXT_PRIME_COLOR};
  }


`;
