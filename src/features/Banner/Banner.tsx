import React from "react";
import {
  Title,
  Subtitle,
  ContactButton,
  LinksGroup,
  Tiger,
} from "./components";

export const Banner = () => {
  return (
    <section
      id="home"
      className="container mx-auto flex h-svh flex-col-reverse items-center justify-center gap-4 p-4 lg:flex-row"
    >
      <article className="text-center font-secondary lg:text-left">
        <Title />
        <Subtitle />
        <ContactButton />
        <LinksGroup />
      </article>
      <article>
        <Tiger />
      </article>
    </section>
  );
};
