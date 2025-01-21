import React from 'react'
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
      className="min-h-[85vh] lg:min-h-[78vh] items-center container m-4 flex flex-col-reverse gap-y-8 lg:flex-row lg:items-center lg:gap-x-12"
    >
      <article className="flex-1 text-center font-secondary lg:text-left">
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
