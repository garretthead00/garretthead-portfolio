import { TypeAnimation } from "react-type-animation";
import { Reveal } from "../../../components/motion";

export const Subtitle = () => {
  return (
    <Reveal
      direction="up"
      delay={0.4}
      amount={0.7}
      className="mb-6 font-secondary text-[36px] leading-none font-semibold uppercase lg:text-[60px]"
    >
      <TypeAnimation
        sequence={["Engineer", 2000, "Developer", 2000, "I build things", 2000]}
        speed={50}
        className="text-accent"
        wrapper="span"
        repeat={Infinity}
      />
    </Reveal>
  );
};
