import type { ComponentType } from "react";
import { m, type HTMLMotionProps } from "motion/react";
import { revealVariants } from "./variants";

const revealElements = {
  article: m.article,
  div: m.div,
  li: m.li,
} as const;

type RevealElement = keyof typeof revealElements;

type RevealProps<T extends RevealElement> = Omit<
  HTMLMotionProps<T>,
  "variants" | "initial" | "whileInView" | "viewport" | "custom"
> & {
  /** Element to render. Defaults to `div`. */
  as?: T;
  /** Seconds to wait before playing, for staggering siblings. */
  delay?: number;
  /** Share of the element that must be visible to play. */
  amount?: number;
};

/** Fades and lifts an element in the first time it scrolls into view. */
export const Reveal = <T extends RevealElement = "div">({
  as,
  delay = 0,
  amount = 0.2,
  ...props
}: RevealProps<T>) => {
  const Element = revealElements[as ?? "div"] as ComponentType<
    HTMLMotionProps<T>
  >;

  return (
    <Element
      {...(props as HTMLMotionProps<T>)}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    />
  );
};
