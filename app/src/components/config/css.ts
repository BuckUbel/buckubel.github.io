export const TEXT_SHADOW_PIXEL = "0 0 20px";
export const BOX_SHADOW_PIXEL = TEXT_SHADOW_PIXEL + " 5px";
export const TEXTCOLOR = (color: string) => `
    color: ${color};
    text-shadow: ${TEXT_SHADOW_PIXEL} ${color};
`;