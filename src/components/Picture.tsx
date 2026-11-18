import type { ImgHTMLAttributes } from "react";

interface PictureSources {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

interface PictureProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> {
  picture: PictureSources;
  alt: string;
  sizes: string;
}

/** `<picture>` with one `<source>` per format; the browser picks the best format and width. */
export const Picture = ({ picture, sizes, alt, ...img }: PictureProps) => (
  <picture>
    {Object.entries(picture.sources).map(([format, srcSet]) => (
      <source
        key={format}
        type={`image/${format}`}
        srcSet={srcSet}
        sizes={sizes}
      />
    ))}
    <img
      src={picture.img.src}
      width={picture.img.w}
      height={picture.img.h}
      alt={alt}
      sizes={sizes}
      {...img}
    />
  </picture>
);
