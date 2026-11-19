import type { HtmlTagDescriptor } from "vite";
import { profile, site } from "../content";

const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
  tag: "meta",
  attrs,
  injectTo: "head",
});

/** schema.org Person, so search engines can tie the page to Garrett. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: site.url,
  image: `${site.url}${site.shareImage.path}`,
  sameAs: profile.socials.map((social) => social.href),
};

/**
 * The page's title, description, canonical URL, link-preview (Open Graph and
 * Twitter card) and structured-data tags, built from `src/content`.
 */
export const headTags = (): HtmlTagDescriptor[] => {
  const image = `${site.url}${site.shareImage.path}`;
  return [
    { tag: "title", children: site.title, injectTo: "head" },
    meta({ name: "description", content: site.description }),
    {
      tag: "link",
      attrs: { rel: "canonical", href: site.url },
      injectTo: "head",
    },
    meta({ property: "og:type", content: "website" }),
    meta({ property: "og:url", content: site.url }),
    meta({ property: "og:title", content: site.title }),
    meta({ property: "og:description", content: site.description }),
    meta({ property: "og:image", content: image }),
    meta({ property: "og:image:type", content: "image/jpeg" }),
    meta({
      property: "og:image:width",
      content: String(site.shareImage.width),
    }),
    meta({
      property: "og:image:height",
      content: String(site.shareImage.height),
    }),
    meta({ property: "og:image:alt", content: site.shareImage.alt }),
    meta({ name: "twitter:card", content: "summary_large_image" }),
    meta({ name: "twitter:title", content: site.title }),
    meta({ name: "twitter:description", content: site.description }),
    meta({ name: "twitter:image", content: image }),
    meta({ name: "twitter:image:alt", content: site.shareImage.alt }),
    {
      tag: "script",
      attrs: { type: "application/ld+json" },
      // "<" can't end the script early once escaped.
      children: JSON.stringify(person).replaceAll("<", "\\u003c"),
      injectTo: "head",
    },
  ];
};
