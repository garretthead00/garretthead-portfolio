import CountUpImport from "react-countup";
import { Reveal } from "../../../components/motion";

// react-countup ships CommonJS only. In an ESM ("type": "module") package,
// Vite imports CommonJS with Node semantics, so the component sits on
// `.default`. react-countup is removed in Phase 4 of the upgrade.
type CountUpComponent = typeof CountUpImport;
const CountUp: CountUpComponent =
  (CountUpImport as unknown as { default?: CountUpComponent }).default ??
  CountUpImport;

interface ExperienceListProps {
  inView: boolean;
}

export const ExperienceList = ({ inView }: ExperienceListProps) => {
  return (
    <Reveal
      as="article"
      direction="right"
      delay={0.3}
      amount={0.3}
      className="flex flex-1 flex-wrap justify-center gap-8 lg:gap-x-10"
    >
      <div>
        <div className="text-gradient font-tertiary text-[36px]">
          {inView ? <CountUp start={0} end={8} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">
          Industry <br /> Experience
        </div>
      </div>
      <div>
        <div className="text-gradient font-tertiary text-[36px]">
          {inView ? <CountUp start={0} end={6} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">Javascript</div>
      </div>
      <div>
        <div className="text-gradient font-tertiary text-[36px]">
          {inView ? <CountUp start={0} end={4} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">React</div>
      </div>
      <div>
        <div className="text-gradient font-tertiary text-[36px]">
          {inView ? <CountUp start={0} end={5} duration={5} /> : null} yrs
        </div>
        <div className="font-primary text-sm tracking-[2px]">NodeJS</div>
      </div>
    </Reveal>
  );
};
