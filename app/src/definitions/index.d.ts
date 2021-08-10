declare module "*.md" {
  const value: string; // markdown is just a string
  export default value;
}

declare module "gif.js.optimized/dist/gif" {
  const GIFEncoder: any;
  export default GIFEncoder;
}
