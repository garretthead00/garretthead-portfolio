import TigerLogo from "../../../assets/images/TigerLogo.png";
import { Reveal } from "../../../components/motion";

export const Tiger = () => {
  return (
    <Reveal
      direction="down"
      delay={0.3}
      className="mx-auto max-w-[482px] flex-1 mix-blend-lighten lg:flex"
    >
      <img src={TigerLogo} alt="Tiger Logo" />
    </Reveal>
  );
};
