import { useMotionPreference } from "./motionPreference";

/** On-page switch for reduced motion; the pressed state is announced, the On/Off text is visual. */
export const ReduceMotionToggle = () => {
  const { reduceMotion, toggle } = useMotionPreference();

  return (
    <button
      type="button"
      aria-pressed={reduceMotion}
      onClick={toggle}
      className="flex min-h-11 items-center gap-2 rounded-full border border-light-purple/60 px-4 text-sm font-medium text-light-gray transition-colors hover:border-lsu-gold hover:text-lsu-gold"
    >
      Reduce motion
      <span
        aria-hidden="true"
        className={
          reduceMotion
            ? "rounded-full bg-lsu-gold px-2 py-0.5 font-mono text-xs text-corporate-purple"
            : "rounded-full bg-lsu-purple px-2 py-0.5 font-mono text-xs text-light-gray"
        }
      >
        {reduceMotion ? "On" : "Off"}
      </span>
    </button>
  );
};
