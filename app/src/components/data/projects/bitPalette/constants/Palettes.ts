export const BitPaletteSizes = [8, 16, 32, 64] as const;
export type BitPaletteSizeType = (typeof BitPaletteSizes)[number];

export const Palettes = [
  ['#071821', '#306850', '#86C06C', '#E0F8CF', '#65FF00', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#182107', '#685030', '#C06C86', '#F8CFE0', '#FF0065', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#072118', '#305068', '#866CC0', '#E0CFF8', '#6500FF', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#210718', '#503068', '#6C86C0', '#CFE0F8', '#0065FF', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#211807', '#506830', '#6CC086', '#CFF8E0', '#00FF65', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#000000', '#333333', '#666666', '#999999', '#BBBBBB', '#DDDDDD', '#000000', '#FFFFFF'],
  ['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFBBBB', '#FFDDDD', '#000000', '#FFFFFF'],
  ['#FFDD00', '#FFBB00', '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#000000', '#FFFFFF'],
  ['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#BBBBFF', '#DDDDFF', '#000000', '#FFFFFF'],
  ['#00000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF']
];

export const PaletteColors = Palettes[0];

export const Templates = {
  'Nichts': '8/0/2/00000000000',
  'Herz': '16/0/4/000000000001K0L01gGQa1gfQwGQggha6gggv1gggkGQggga1ggga06gga00Qga001ga0005K0000000000000',
  'Kirschen': '16/0/4/00G0005P0006gK006gH006fGK00L0GG0004400040G0050L005KRa01kRgG1kdga0Ufwf07gcf00QaL001K000',
  'Custom': '',
};

export const TemplateKeys: Array<keyof typeof Templates> = Object.keys(Templates) as Array<keyof typeof Templates>;
export const TemplateValues = Object.values(Templates);
