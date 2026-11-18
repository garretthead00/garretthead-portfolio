import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "../../../components/motion";

export const LinksGroup = () => {
  return (
    <Reveal
      direction="right"
      delay={0.3}
      amount={0.7}
      className="mx-auto flex max-w-max gap-x-6 text-[32px] lg:mx-0"
    >
      <a href="https://www.linkedin.com/in/garretthead">
        <FaLinkedin />
      </a>
      <a href="https://www.github.com/garretthead00">
        <FaGithub />
      </a>
    </Reveal>
  );
};
