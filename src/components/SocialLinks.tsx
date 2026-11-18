import { profile } from "../content";
import { Icon } from "./Icon";

/** Icon-only LinkedIn and GitHub links, each with an accessible name. */
export const SocialLinks = () => (
  <ul className="flex gap-1">
    {profile.socials.map((social) => (
      <li key={social.id}>
        <a
          href={social.href}
          aria-label={social.label}
          className="grid size-11 place-items-center text-light-gray hover:text-lsu-gold"
        >
          <Icon name={social.id} />
        </a>
      </li>
    ))}
  </ul>
);
