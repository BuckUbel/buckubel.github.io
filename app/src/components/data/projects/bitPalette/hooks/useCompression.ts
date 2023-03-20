import { changeNumberBase, getBaseLog } from '../../../../helper/math';
import { useMemo } from 'react';

function getSrcAlphabet(size: number) {
  return Array.from({ length: size }, (_, index) => String(index));
}

export const TARGET_ALPHABET_NUMBERS: string[] = Array.from({ length: 10 }, (_, index) => String.fromCharCode(48 + index));
export const TARGET_ALPHABET_BIG_LETTERS: string[] = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
export const TARGET_ALPHABET_LITTLE_LETTERS: string[] = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));
export const TARGET_ALPHABET_OTHERS1: string[] = Array.from({ length: 16 }, (_, index) => String.fromCharCode(32 + index));
export const TARGET_ALPHABET_OTHERS2: string[] = Array.from({ length: 7 }, (_, index) => String.fromCharCode(58 + index));
export const TARGET_ALPHABET_OTHERS3: string[] = Array.from({ length: 6 }, (_, index) => String.fromCharCode(91 + index));
export const TARGET_ALPHABET_OTHERS4: string[] = Array.from({ length: 4 }, (_, index) => String.fromCharCode(123 + index));

export const TARGET_ALPHABET: string[] = [
  ...TARGET_ALPHABET_NUMBERS,
  ...TARGET_ALPHABET_BIG_LETTERS,
  ...TARGET_ALPHABET_LITTLE_LETTERS,
  ...TARGET_ALPHABET_OTHERS1,
  ...TARGET_ALPHABET_OTHERS2,
  ...TARGET_ALPHABET_OTHERS3,
  ...TARGET_ALPHABET_OTHERS4
]; // in addition 95 charactes

const ERROR_TEXT = 'ERROR!';

export function useCompression(imageSize: number, paletteSize: number, trgAlphabet: readonly string[] = TARGET_ALPHABET) {

  let replaceCodes: { [code: string]: number } = {};
  replaceCodes = useMemo(() => {
    const newReplaceCodes: { [code: string]: number } = {};
    trgAlphabet.forEach((char, index) => {
      newReplaceCodes[char] = index;
    });
    return newReplaceCodes;
  }, [trgAlphabet]);

  const getCompressedText = (text: string, imageSize: number, paletteSize: number) => {

    const srcAlphabet: string[] = getSrcAlphabet(paletteSize);
    let compressedText = '';
    const srcCharCount = srcAlphabet.length;
    const trgCharCount = trgAlphabet.length;
    const chunk = Math.floor(getBaseLog(srcCharCount, trgCharCount)); // for 7 we need an alphabet with more as 127 charactesr
    const segments = text.match(new RegExp('.{1,' + chunk + '}', 'g'));

    let error = false;

    if (segments !== null) {
      for (let i = 0; i < segments.length; i++) {
        const newChar = trgAlphabet[parseInt(segments[i], srcAlphabet.length)];
        if (newChar === undefined) {
          i = segments.length;
          error = true;
        }
        compressedText += newChar;
      }
    }

    if (error) {
      return ERROR_TEXT;
    }

    return compressedText;
  };

  const getUncompressedText = (text: string, imageSize: number, paletteSize: number) => {

    const srcAlphabet: string[] = getSrcAlphabet(paletteSize);
    if (text === ERROR_TEXT) {
      return ERROR_TEXT;
    }

    let unCompressedText = '';
    const srcCharCount = srcAlphabet.length;
    const trgCharCount = trgAlphabet.length;
    const chunk = Math.floor(getBaseLog(srcCharCount, trgCharCount)); // for 7 we need an alphabet with more as 127 character
    const numberBase = srcCharCount;

    const segments = text.split('');
    if (segments !== null && segments.length > 0) {
      segments.forEach((seg, index) => {
        let uncompressedChar = changeNumberBase(replaceCodes[seg], numberBase);
        const codeCharLength = uncompressedChar.length;

        // Calc the missing 0 of this char
        let missingZeroCount = chunk - codeCharLength;
        if (index === segments.length - 1) {
          // Attention: the image size ist not a multiple of the chunk sizes
          missingZeroCount = (imageSize * imageSize - (chunk * (segments.length - 1))) - codeCharLength;
        }

        for (let i = 0; i < missingZeroCount; i++) {
          uncompressedChar = replaceCodes[0] + uncompressedChar;
        }
        unCompressedText += uncompressedChar;

      });

      const missingZeroCount = imageSize * imageSize - unCompressedText.length;
      for (let i = 0; i < missingZeroCount; i++) {
        unCompressedText += replaceCodes[0];
      }
    }

    return unCompressedText;
  };
  const _getCompressedText = (text: string, newImageSize?: number, newPaletteSize?: number) => {
    return getCompressedText(text, newImageSize ?? imageSize, newPaletteSize ?? paletteSize);
  };
  const _getUncompressedText = (text: string, newImageSize?: number, newPaletteSize?: number) => {
    return getUncompressedText(text, newImageSize ?? imageSize, newPaletteSize ?? paletteSize);
  };
  return { getCompressedText: _getCompressedText, getUncompressedText: _getUncompressedText };
}
