import { profile } from "../../content";
import { ReduceMotionToggle } from "../motion";
import { SocialLinks } from "../SocialLinks";

export const SiteFooter = () => (
  <footer className="border-t border-light-purple/30 pb-24 contrast-more:border-light-purple md:pb-0">
    <div className="container-page flex flex-wrap items-center justify-between gap-4 py-10">
      <p className="text-sm text-light-purple contrast-more:text-light-gray">
        {/* The prerendered year (the deploy year) is kept if the visit is later. */}
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
        {profile.name}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <ReduceMotionToggle />
        <SocialLinks />
      </div>
    </div>
  </footer>
);
