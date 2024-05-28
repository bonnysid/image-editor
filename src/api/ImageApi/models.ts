export type ImageUploadResult = {
  url: string;
  message: string;
  info: {
    alpha?: boolean;
    bpp?: number;
    color?: boolean;
    colorDepth: number;
    colorType?: number;
    depth?: number;
    gamma?: number;
    colorModel?: string;
    palette?: boolean | Array<Array<number>>;
    height: number;
    type: string;
    width: number;
    interlace?: boolean;
  }
}

export type ImageProcessResult = {
  image_url: string;
}
