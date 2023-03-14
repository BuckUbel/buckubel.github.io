import { useParams, useRouter } from 'react-router-ts';
import { BitPaletteSizes, BitPaletteSizeType, PaletteColors, Palettes } from '../constants/Palettes';
import { useEffect, useMemo, useState } from 'react';
import { useCompression } from './useCompression';
import { getDefaultImageData } from '../constants/ImageData';
import { LocalStorageKeys, useSimpleLocalStorage } from '../../../../../hooks/useSimpleLocalStorage';

export function usePresetFromParams(defaultSize: BitPaletteSizeType, defaultPaletteId: number, defaultPaletteSize: number) {
  // router is of type RouterContextValue (see below)
  const router = useRouter();
  const params = useParams<{
    size: string,
    paletteId: string,
    paletteSize: string,
    data: string
  }>('/project/:project/:size?/:paletteId?/:paletteSize?/:data?');

  function getPath(size: number, paletteId: number, paletteSize: number, data: string) {
    return `/project/bitpalette/${size}/${paletteId}/${paletteSize}/${data}`;
  }

  const { getCompressedText: getDefaultCompressedText } = useCompression(defaultSize, defaultPaletteSize);
  useEffect(() => {
    if (!params.size || !params.paletteId || !params.paletteSize || !params.data) {
      const presetDefaultData = getDefaultImageData(defaultSize);
      const presetCompressedString = getDefaultCompressedText(presetDefaultData);
      router.history.push(getPath(defaultSize, defaultPaletteId, defaultPaletteSize, presetCompressedString));
    }
  }, [params.size, params.paletteId, params.paletteSize, params.data]);

  const parsedPresetImageSize = BitPaletteSizes[BitPaletteSizes.indexOf(parseInt(params?.size) as BitPaletteSizeType)];
  const presetImageSize = parsedPresetImageSize ?? defaultSize;
  const imageSizeState = useState(presetImageSize);
  const [imageSize] = imageSizeState;

  const LS = useSimpleLocalStorage(LocalStorageKeys.COLOR_PALETTES, Palettes);
  const palettes = useMemo(() => {
    return LS.getData();
  }, []);
  const parsedPresetPaletteIndex = parseInt(params?.paletteId);
  const presetPaletteIndex = parsedPresetPaletteIndex < palettes.length ? parsedPresetPaletteIndex : defaultPaletteId;
  const paletteIndexState = useState(presetPaletteIndex);
  const [paletteIndex] = paletteIndexState;

  const parsedPresetPaletteSize = parseInt(params?.paletteSize);
  const presetPaletteSize = parsedPresetPaletteSize <= PaletteColors.length ? parsedPresetPaletteSize : defaultPaletteSize;
  const paletteSizeState = useState(presetPaletteSize);
  const [paletteSize] = paletteSizeState;

  const presetDataString = params?.data ?? '';
  const { getUncompressedText, getCompressedText } = useCompression(imageSize, paletteSize);
  const unCompressedString = getUncompressedText(presetDataString);
  const imageDataStringState = useState(unCompressedString);
  const [imageDataString] = imageDataStringState;

  useEffect(() => {
    const compressedText = getCompressedText(imageDataString);
    router.history.push(getPath(imageSize, paletteIndex, paletteSize, compressedText));
  }, [imageSize, paletteIndex, paletteSize, imageDataString]);

  return {
    imageSizeState,
    paletteSizeState,
    imageDataStringState,
    paletteIndexState,
    presetImageSize,
    presetPaletteSize,
    unCompressedString,
    presetDataString,
    palettes
  };
}
