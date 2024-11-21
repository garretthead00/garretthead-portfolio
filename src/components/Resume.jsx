import { BsArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../common/transitions";
import { experience } from "../data";

const Resume = () => {
  return (
    <section id="resume" className="">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 lg:bg-services lg:bg-bottom bg-no-repeat mix-blend-lighten mb-4 border-b border-white/20"
          >
            <h2 className="h2 text-accent mb-6">Experience</h2>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            className="flex-1"
          >
            <div>
              {experience.map((role, idx) => {
                const {
                  company,
                  description,
                  duration,
                  companyLink,
                  title,
                  stack,
                  icon
                } = role;

                const techStackList =
                  stack &&
                  stack.map((tech, idx) => {
                    return (
                      <li key={idx + "_techStackItem"}>
                        <figure className="text-center items-center justify-center">
                          {tech.icon}
                          <figcaption className="text-sm mt-1">
                            {tech.name}
                          </figcaption>
                        </figure>
                      </li>
                    );
                  });
                return (
                  <div
                    key={idx + "_roleItem"}
                    className="relative flex border-b border-white/20 h-fit mb-[12px] pb-4"
                  >
                    <div className="max-w-[476px]">
                      <img src={icon} alt="image" className="w-32 h-32 mt-2 mb-8"/>

                      <h4 className="text-[20px] tracking-wider font-primary font-semibold">
                        {company}
                      </h4>

                      <h4 className="text-[14px] tracking-wider font-primary font-semibold text-accent">
                        {title} - {duration}
                      </h4>
                      <p className="font-secondary leading-tight ">
                        {description}
                      </p>
                      <br />
                      <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                        {techStackList}
                      </ul>
                    </div>

                    <div className="absolute top-0 right-0">
                      <a
                        href={companyLink}
                        className="btn w-9 h-9 mb-[42px] flex justify-center items-center"
                      >
                        <BsArrowUpRight />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
