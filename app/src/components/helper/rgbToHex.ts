function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}
export function uInt8ArrayToHex(arr: Uint8ClampedArray) {
  return rgbaToHex(arr[0], arr[1], arr[2], arr[3]);
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
export function rgbaToHex(r: number, g: number, b: number, a: number) {
  return (
    "#" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b) +
    componentToHex(a)
  );
}

export function hexToRgba(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  );
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 16),
      }
    : null;
}
