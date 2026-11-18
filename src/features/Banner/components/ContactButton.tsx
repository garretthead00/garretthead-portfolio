import { Reveal } from "../../../components/motion";

export const ContactButton = () => {
  return (
    <Reveal
      direction="up"
      delay={0.6}
      amount={0.7}
      className="mx-auto mb-12 flex max-w-max items-center gap-x-6 lg:mx-0"
    >
      <button
        className="btn btn-lg"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "#contact";
        }}
      >
        Contact Me
      </button>
    </Reveal>
  );
};
