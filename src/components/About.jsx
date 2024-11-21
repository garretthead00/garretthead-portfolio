import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../common/transitions";

import { skills } from "../data";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const techStackList =
    skills &&
    skills.map((tech, idx) => {
      return (
        <li key={idx + "_techStackItem"}>
          <figure className="text-center items-center justify-center">
            {tech.icon}
            <figcaption className="text-sm mt-1">{tech.name}</figcaption>
          </figure>
        </li>
      );
    });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-10 items-center min-h-[85vh] lg:flex-row lg:items-center lg:gap-x-12 lg:min-h-[78vh]">
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            <h2 className="h2 text-accent">About me</h2>
            <h3 className="h3 mb-4">Senior Software Engineer</h3>
            <p className="mb-6">
              My career has brought me to many different areas, rarely settling
              down for long. I began building custom applications for Oil & Gas
              and Petrochem facilities until breaking into new areas of the
              field.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-12 lg:gap-x-10">
              <div>
                <div className="text-[36px] font-tertiary text-gradient mb-2">
                  {inView ? <CountUp start={0} end={10} duration={5} /> : null}{" "}
                  yrs
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  Industry <br /> Experience
                </div>
              </div>
              <div>
                <div className="text-[36px] font-tertiary text-gradient mb-2">
                  {inView ? <CountUp start={0} end={8} duration={3} /> : null}{" "}
                  yrs
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  Javascript
                </div>
              </div>
              <div>
                <div className="text-[36px] font-tertiary text-gradient mb-2">
                  {inView ? <CountUp start={0} end={5} duration={3} /> : null}{" "}
                  yrs
                </div>
                <div className="font-primary text-sm tracking-[2px]">React</div>
              </div>
              <div>
                <div className="text-[36px] font-tertiary text-gradient mb-2">
                  {inView ? <CountUp start={0} end={5} duration={3} /> : null}{" "}
                  yrs
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  NodeJS
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col text-center my-4">
              <h4 className="text-[20px] tracking-wider font-primary font-semibold">
                Skills
              </h4>
              <br />
              <ul className="flex flex-wrap gap-4 mx-auto justify-center">
                {techStackList}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
