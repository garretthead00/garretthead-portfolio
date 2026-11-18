import { Reveal } from "../../../components/motion";

export const Title = () => {
  return (
    <Reveal
      as="h1"
      direction="up"
      delay={0.3}
      amount={0.7}
      className="text-[55px] leading-[0.8] font-bold lg:text-[110px]"
    >
      <span>Garrett Head</span>
    </Reveal>
  );
};
