import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";
import { education } from "../../../data";

export const JobTitle = () => (
  <motion.article
    variants={fadeIn("right", 0.3)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.3 }}
    className="mb-4 flex-1 bg-no-repeat mix-blend-lighten lg:bg-bottom"
  >
    <div className="flex flex-col items-center justify-center">
      <h2 className="h2 mb-6 text-accent">Experience</h2>
      <h3 className="h3 max-w-[455px] lg:mb-16">Senior Software Engineer</h3>
    </div>

    <div className="hidden items-center lg:flex lg:flex-col">
      <img src={education.icon} alt="" className="w-[200px]" />
      <h4 className="mb-2 font-primary font-semibold tracking-wider">
        {education.degree} in {education.concentration}
      </h4>
    </div>
  </motion.article>
);
