import * as React from 'react';
import { useState } from 'react';
import { StateType, StyledCompProps } from '../../../../helper/types';
import styled from 'styled-components';
import BorderContainer from '../../../../content/BorderContainer';
import { TEXTCOLOR } from '../../../../config/css';
import { Color } from '../../../../config/color';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCompression } from '../hooks/useCompression';
import ColorRect from '../../../../elements/ColorRect';
import {IconProp} from "@fortawesome/fontawesome-svg-core";


interface BitPaletteCompressedContainerProps extends StyledCompProps {
  dataStringState: StateType<string>;
  paletteSize: number;
  imageSize: number;
  collapsedState: StateType<boolean>;
  detailedControl?: boolean;
}

function BitPaletteCompressedContainer({
                                         className,
                                         dataStringState,
                                         paletteSize,
                                         imageSize,
                                         collapsedState,
                                         detailedControl
                                       }: BitPaletteCompressedContainerProps) {

  const [dataString] = dataStringState;
  const [showCopyText, setShowCopyText] = useState(false);

  const { getCompressedText, getUncompressedText } = useCompression(imageSize, paletteSize);
  const compressedString = getCompressedText(dataString);
  const unCompressedString = getUncompressedText(compressedString);

  const setCompressedStringInClipboard = () => {
    navigator.clipboard.writeText(compressedString);
    setShowCopyText(true);
    setTimeout(() => {
      setShowCopyText(false);
    }, 1000);
  };

  return (
    <BorderContainer extraClassName={className} collapsedState={collapsedState}>
      {!detailedControl && <p className={'bitpalette-uncompressed-label'}>
        Kontrolle:
        <ColorRect color={dataString === unCompressedString ? Color.TEXT_SUCCESS_COLOR : Color.TEXT_ERROR_COLOR} />
      </p>}

      <p className={'bitpalette-compressed-string'} onClick={setCompressedStringInClipboard}>
        {compressedString}
        <FontAwesomeIcon size={'2x'} icon={faCopy as IconProp} />
        <span className={showCopyText ? 'show-copy-text' : ''}>Kopiert!</span>
      </p>

      {detailedControl &&
        <p className={(dataString === unCompressedString ? 'same-string ' : '') + 'bitpalette-uncompressed-string'}>
          {unCompressedString}
        </p>}
    </BorderContainer>
  );
}

function getWidth({ imageSize }: BitPaletteCompressedContainerProps) {
  return 2 + imageSize / 8 * 70 + 'px';
}

export default styled(BitPaletteCompressedContainer)`
  .bitpalette-compressed-string {
    position: relative;

    height: 16px;
    margin: 10px;
    padding: 6px 20px 6px 6px;

    cursor: pointer;

    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};

    background: ${Color.PRIME_COLOR};
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};

    transition: color 1s, background 1s;

    &:hover {
      background: ${Color.BETA_COLOR};
      ${TEXTCOLOR(Color.TEXT_PRIME_COLOR)};
    }

    &.selected {
      background: ${Color.TEXT_PRIME_COLOR};
      ${TEXTCOLOR(Color.BETA_COLOR)};
    }

    svg {
      position: absolute;
      top: 0;
      right: 0;

      box-sizing: border-box;
      padding: 5px;
    }

    span {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      background: ${Color.TEXT_PRIME_COLOR};
      ${TEXTCOLOR(Color.BETA_COLOR)};

      opacity: 0;
      transition: opacity 1s;

      &.show-copy-text {
        opacity: 100%;
      }
    }
  }

  .bitpalette-uncompressed-label {
    display: inline-block;
    vertical-align: middle;

    .color-rect {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-left: 15px;
    }
  }

  .bitpalette-uncompressed-string {
    display: inline-block;
    vertical-align: middle;
    padding: 5px;
    margin: 0 10px;

    width: ${getWidth};
    word-break: break-all;
    font-family: monospace;
    border: 1px solid ${Color.TEXT_PRIME_COLOR};
    box-shadow: 0 0 20px -5px ${Color.TEXT_PRIME_COLOR};

    &.same-string {
      border: 1px solid ${Color.TEXT_SUCCESS_COLOR};
      ${TEXTCOLOR(Color.TEXT_SUCCESS_COLOR)};
    }
  }
`;
