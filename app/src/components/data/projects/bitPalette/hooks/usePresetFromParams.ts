import { useParams, useRouter } from 'react-router-ts';
import { BitPaletteSizes, BitPaletteSizeType, PaletteColors } from '../constants/Palettes';
import { useEffect, useState } from 'react';
import { useCompression } from './useCompression';

export function usePresetFromParams(defaultSize: number, defaultPaletteSize: number) {
  // router is of type RouterContextValue (see below)
  const router = useRouter();
  const params = useParams<{ size: string, palette: string, data: string }>('/project/:project/:size?/:palette?/:data?');

  useEffect(() => {
    if (!params.size || !params.palette || !params.data) {
      router.history.push('/project/bitpalette/8/2/00000000000');
    }
  }, [params.size, params.palette, params.data]);

  const parsedPresetImageSize = BitPaletteSizes[BitPaletteSizes.indexOf(parseInt(params?.size) as BitPaletteSizeType)];
  const presetImageSize = parsedPresetImageSize ?? defaultSize;
  const imageSizeState = useState(presetImageSize);
  const [imageSize] = imageSizeState;

  const parsedPresetPaletteSize = parseInt(params?.palette);
  const presetPaletteSize = parsedPresetPaletteSize <= PaletteColors.length ? parsedPresetPaletteSize : defaultPaletteSize;
  const paletteSizeState = useState(presetPaletteSize);
  const [paletteSize] = paletteSizeState;

  const presetDataString = params?.data ?? '';
  const srcAlphabet = Array.from({length: paletteSize}, (_, index) => String(index));
  const { getUncompressedText, getCompressedText } = useCompression(srcAlphabet, paletteSize);
  const unCompressedString = getUncompressedText(presetDataString);
  const imageDataStringState = useState(unCompressedString);
  const [imageDataString] = imageDataStringState;
console.log(imageDataString)

  useEffect(() => {
    const compressedText = getCompressedText(imageDataString);
    router.history.push(`/project/bitpalette/${imageSize}/${paletteSize}/${compressedText}`);
  }, [imageSize, paletteSize, imageDataString]);


  return {
    imageSizeState,
    paletteSizeState,
    imageDataStringState,
    presetImageSize,
    presetPaletteSize,
    unCompressedString,
    presetDataString
  };
}
