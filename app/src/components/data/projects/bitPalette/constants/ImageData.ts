import { BitPaletteSizeType } from './Palettes';

export function getDefaultImageData(newSize: BitPaletteSizeType, overwriteText?: string) {
  const newLength = newSize * newSize;
  const defaultReturn = '0'.repeat(newLength);
  if (!overwriteText) return defaultReturn;
  const prevImageSize = Math.sqrt(overwriteText.length);
  if (newSize > prevImageSize) {
    const diff = newSize - prevImageSize;
    const regex = new RegExp('.{1,' + prevImageSize + '}', 'g');
    const chunks = overwriteText.match(regex);
    if (chunks !== null) {
      const newChunks = chunks.map(chunk => chunk + '0'.repeat(diff));
      return newChunks.join('') + '0'.repeat(diff * newSize);
    }
    return defaultReturn;
  }
  if(prevImageSize>newSize){
    const regex = new RegExp('.{1,' + newSize + '}', 'g');
    const chunks = overwriteText.match(regex);
    if (chunks !== null) {
      return chunks.filter((element, index) => {
        return index % 2 === 0 && index < chunks.length/2;
      }).join('');
    }
    return overwriteText.substring(0, newLength);
  }
  return overwriteText.substring(0, newLength);
}


