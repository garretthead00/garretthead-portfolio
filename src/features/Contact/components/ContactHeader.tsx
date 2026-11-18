import { Reveal } from "../../../components/motion";

export const ContactHeader = () => {
  return (
    <Reveal
      direction="right"
      delay={0.2}
      amount={0.3}
      className="flex flex-1 items-center justify-start"
    >
      <div>
        <h4 className="text-xl font-medium tracking-wide uppercase lg:mb-2">
          Let's Geaux!
        </h4>
        <h2 className="h2 text-gradient mb-4 uppercase lg:text-[45px]">
          Contact me
        </h2>
      </div>
    </Reveal>
  );
};
