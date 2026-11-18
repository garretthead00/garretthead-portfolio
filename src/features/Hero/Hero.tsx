import TigerLogo from "../../assets/images/TigerLogo.png";
import { Icon } from "../../components/Icon";
import { profile } from "../../content";

/** Name, title and the two calls to action. Visible at first paint: no entrance animation. */
export const Hero = () => {
  const [linkedin, github] = profile.socials;

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative overflow-hidden border-b border-light-purple/30 contrast-more:border-light-purple"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/5 -right-1/10 h-[140%] w-[70%] bg-[radial-gradient(closest-side,rgba(70,29,124,0.95),transparent)] max-md:top-10 max-md:-left-1/3 max-md:h-[420px] max-md:w-[160%]"
      />
      <div className="container-page relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-28">
        <div className="flex flex-col gap-7 max-md:order-2 max-md:gap-5">
          <p className="eyebrow">{profile.title}</p>
          <h1
            id="home-title"
            className="font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.98] font-extrabold tracking-[0.01em] text-balance"
          >
            {profile.name}
          </h1>
          <p className="max-w-[34ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-normal text-pretty text-light-gray">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3 pt-2 max-sm:flex-col">
            {linkedin && (
              <a
                href={linkedin.href}
                className="flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-lsu-gold px-6 font-semibold text-corporate-purple hover:bg-corporate-gold hover:text-corporate-purple forced-colors:border"
              >
                <Icon name="linkedin" size={20} />
                Connect on {linkedin.label}
              </a>
            )}
            {github && (
              <a
                href={github.href}
                className="flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-light-purple px-6 font-semibold text-white hover:border-lsu-gold hover:text-lsu-gold"
              >
                <Icon name="github" size={20} />
                View {github.label}
              </a>
            )}
          </div>
        </div>
        <div className="flex justify-center max-md:order-1">
          <img
            src={TigerLogo}
            alt="Tiger illustration in purple and gold"
            width={1200}
            height={1250}
            fetchPriority="high"
            className="h-auto w-[min(100%,460px)] mix-blend-lighten max-md:w-[260px] forced-colors:mix-blend-normal"
          />
        </div>
      </div>
    </section>
  );
};
