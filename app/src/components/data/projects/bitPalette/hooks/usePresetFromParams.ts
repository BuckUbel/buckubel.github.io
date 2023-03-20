import { useParams, useRouter } from 'react-router-ts';
import {
  BitPaletteSizes,
  BitPaletteSizeType,
  PaletteColors,
  Palettes, TemplateKeys,
  Templates,
  TemplateValues
} from '../constants/Palettes';
import { useEffect, useMemo, useState } from 'react';
import { useCompression } from './useCompression';
import { getDefaultImageData } from '../constants/ImageData';
import { LocalStorageKeys, useSimpleLocalStorage } from '../../../../../hooks/useSimpleLocalStorage';

const BITPALETTE_URL = '/project/bitpalette/';

export function usePresetFromParams(defaultSize: BitPaletteSizeType, defaultPaletteIndex: number, defaultPaletteSize: number) {
  // router is of type RouterContextValue (see below)
  const router = useRouter();
  const params = useParams<{
    size: string,
    paletteIndex: string,
    paletteSize: string,
    data: string
  }>('/project/:project/:size?/:paletteIndex?/:paletteSize?/:data?');

  function getPath(size: number, paletteIndex: number, paletteSize: number, data: string) {
    return `${size}/${paletteIndex}/${paletteSize}/${data}`;
  }

  const { getCompressedText: getDefaultCompressedText } = useCompression(defaultSize, defaultPaletteSize);
  useEffect(() => {
    if (!params.size || !params.paletteIndex || !params.paletteSize || !params.data) {
      const presetDefaultData = getDefaultImageData(defaultSize);
      const presetCompressedString = getDefaultCompressedText(presetDefaultData);
      router.history.push(BITPALETTE_URL+getPath(defaultSize, defaultPaletteIndex, defaultPaletteSize, presetCompressedString));
    }
  }, [params.size, params.paletteIndex, params.paletteSize, params.data]);

  const parsedPresetImageSize = BitPaletteSizes[BitPaletteSizes.indexOf(parseInt(params?.size) as BitPaletteSizeType)];
  const presetImageSize = parsedPresetImageSize ?? defaultSize;
  const imageSizeState = useState(presetImageSize);
  const [imageSize, setImageSize] = imageSizeState;

  const LS = useSimpleLocalStorage(LocalStorageKeys.COLOR_PALETTES, Palettes);
  const palettes = useMemo(() => {
    return LS.getData();
  }, []);
  const parsedPresetPaletteIndex = parseInt(params?.paletteIndex);
  const presetPaletteIndex = parsedPresetPaletteIndex < palettes.length ? parsedPresetPaletteIndex : defaultPaletteIndex;
  const paletteIndexState = useState(presetPaletteIndex);
  const [paletteIndex, setPaletteIndex] = paletteIndexState;

  const parsedPresetPaletteSize = parseInt(params?.paletteSize);
  const presetPaletteSize = parsedPresetPaletteSize <= PaletteColors.length ? parsedPresetPaletteSize : defaultPaletteSize;
  const paletteSizeState = useState(presetPaletteSize);
  const [paletteSize, setPaletteSize] = paletteSizeState;

  const presetDataString = params?.data ?? '';
  const { getUncompressedText, getCompressedText } = useCompression(imageSize, paletteSize);
  const unCompressedString = getUncompressedText(presetDataString);
  const imageDataStringState = useState(unCompressedString);
  const [imageDataString, setImageDataString] = imageDataStringState;

  const templateState = useState<keyof typeof Templates>('Custom');
  const [, setTemplate] = templateState;

  useEffect(() => {
    const compressedText = getCompressedText(imageDataString);
    const newPath = getPath(imageSize, paletteIndex, paletteSize, compressedText);
    const templateIndex = TemplateValues.findIndex(val => val === newPath);
    if (templateIndex > -1) {
      setTemplate(TemplateKeys[templateIndex]);
    }
    else {
      setTemplate("Custom");
    }
    router.history.push(BITPALETTE_URL+newPath);
  }, [imageSize, paletteIndex, paletteSize, imageDataString]);

  const loadStateFromTemplate = (template: string) => {
    if (template) {

      const templateData = template.split('/');
      const [size, paletteIndex, paletteSize, data] = templateData;

      if (!!size && !!paletteIndex && !!paletteSize && !!data) {
        const newImageSize = Number(size) as BitPaletteSizeType;
        const newPaletteSize = Number(paletteSize);
        const newPaletteIndex = Number(paletteIndex);
        const uncompressedData = getUncompressedText(data, newImageSize, newPaletteSize);
        setImageSize(newImageSize);
        setPaletteIndex(newPaletteIndex);
        setPaletteSize(newPaletteSize);
        setImageDataString(uncompressedData);
      }
    }
  };

  return {
    imageSizeState,
    paletteSizeState,
    imageDataStringState,
    paletteIndexState,
    templateState,
    presetImageSize,
    presetPaletteSize,
    unCompressedString,
    presetDataString,
    palettes,
    loadStateFromTemplate
  };
}
