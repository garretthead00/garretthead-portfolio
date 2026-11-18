import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const Subtitle = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="mb-6 font-secondary text-[36px] leading-none font-semibold uppercase lg:text-[60px]"
    >
      <TypeAnimation
        sequence={["Engineer", 2000, "Developer", 2000, "I build things", 2000]}
        speed={50}
        className="text-accent"
        wrapper="span"
        repeat={Infinity}
      />
    </motion.div>
  );
};
