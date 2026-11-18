import type { ComponentType } from "react";
import { m, type HTMLMotionProps } from "motion/react";
import { fadeIn, type FadeDirection } from "./variants";

const revealElements = {
  article: m.article,
  div: m.div,
  form: m.form,
  h1: m.h1,
} as const;

type RevealElement = keyof typeof revealElements;

type RevealProps<T extends RevealElement> = Omit<
  HTMLMotionProps<T>,
  "variants" | "initial" | "whileInView" | "viewport"
> & {
  /** Element to render. Defaults to `div`. */
  as?: T;
  direction: FadeDirection;
  delay: number;
  /** Share of the element that must be visible to play; omit for Motion's default. */
  amount?: number;
};

/** Fades and slides an element in each time it scrolls into view. */
export const Reveal = <T extends RevealElement = "div">({
  as,
  direction,
  delay,
  amount,
  ...props
}: RevealProps<T>) => {
  const Element = revealElements[as ?? "div"] as ComponentType<
    HTMLMotionProps<T>
  >;

  return (
    <Element
      {...(props as HTMLMotionProps<T>)}
      variants={fadeIn(direction, delay)}
      initial="hidden"
      whileInView="show"
      viewport={amount === undefined ? undefined : { once: false, amount }}
    />
  );
};
