import { profile } from "../../content";
import { SocialLinks } from "../SocialLinks";

export const SiteFooter = () => (
  <footer className="border-t border-light-purple/30 pb-24 md:pb-0">
    <div className="container-page flex flex-wrap items-center justify-between gap-4 py-10">
      <p className="text-sm text-light-purple">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <SocialLinks />
    </div>
  </footer>
);
