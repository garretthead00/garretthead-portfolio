/** Responsive images from vite-imagetools (`?w=…&format=…&as=picture`). */
declare module "*&as=picture" {
  const picture: {
    /** srcset per format, e.g. `{ avif: "a.avif 260w, …", webp: "…" }`. */
    sources: Record<string, string>;
    /** Fallback image: the last format at the largest width. */
    img: { src: string; w: number; h: number };
  };
  export default picture;
}
