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
      className="container flex flex-col-reverse lg:flex-row gap-4 h-svh mx-auto p-4 justify-center items-center"
    >
      <article className="font-secondary text-center lg:text-left">
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
