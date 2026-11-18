import { motion } from "framer-motion";
import { fadeIn } from "../../../common/transitions";

export const ContactHeader = () => {
  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-1 items-center justify-start"
    >
      <div>
        <h4 className="text-xl font-medium uppercase tracking-wide lg:mb-2">
          Let's Geaux!
        </h4>
        <h2 className="h2 text-gradient mb-4 uppercase lg:text-[45px]">
          Contact me
        </h2>
      </div>
    </motion.div>
  );
};
