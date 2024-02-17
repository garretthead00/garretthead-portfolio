import { BsArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../common/transitions";
import { education, experience } from "../data";

const Resume = () => {
  return (
    <section id="resume" className="section">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 lg:bg-serrvices lg:bg-bottom bg-no-repeat mix-blend-lighten mb-4"
          >
            <h2 className="h2 text-accent mb-6">Experience</h2>
            <h3 className="h3 max-w-[455px] lg:mb-16">
              Full Stack Software Engineer
            </h3>

            <div className="hidden items-center max-w-[476px] lg:flex lg:flex-col lg:max-w-[482px]">
              <img src={education.icon} alt="" className="w-[200px]" />
              <h3 className="text-xl">{education.school}</h3>
              <h4 className="text-[12px] tracking-wider font-primary font-semibold mb-2">
                {education.degree} in {education.concentration}
              </h4>
            </div>
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
                } = role;

                const techStackList =
                  stack &&
                  stack.map((tech, idx) => {
                    return (
                      <li key={idx + '_techStackItem'}>
                        <figure className="text-center items-center justify-center">
                          {tech.icon}
                          <figcaption className="text-sm mt-1">{tech.name}</figcaption>
                        </figure>
                      </li>
                    )
                  });
                return (
                  <div
                    key={idx + '_roleItem'}
                    className="flex border-b border-white/20 h-fit mb-[12px] pb-4"
                  >
                    <div className="max-w-[476px]">
                      <h4 className="text-[20px] tracking-wider font-primary font-semibold">
                        {title}
                      </h4>
                      
                      <h4 className="text-[12px] tracking-wider font-primary font-semibold">
                        {company} - {duration}
                      </h4>
                      <p className="font-secondary leading-tight">
                        {description}
                      </p>
                      <br/>
                      <ul className="flex flex-wrap justify-center md:justify-start gap-4">{techStackList}</ul>
                    </div>
                    
                    <div className="flex flex-col flex-1 items-end">
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
