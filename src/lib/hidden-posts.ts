/**
 * Posts hidden from the site without deleting them from Directus.
 * Hidden posts are dropped from every listing, feed, sitemap and slug route
 * because they are filtered out in `getPosts` and `getPostBySlug`.
 * Remove a slug here to make a post public again.
 */
const HIDDEN_POST_SLUGS: ReadonlySet<string> = new Set([
  "the-limitations-of-natural-revelation",
  "christians-can-not-vote-the-country-into-what-they-want-to-see",
  "an-excerpt-on-old-testament-law",
  "how-to-have-a-secure-election",
  "should-we-forgive-ourselves",
  "what-is-common-grace",
  "elders-and-pastors-should-be-good-with-money",
  "jesus-is-alive",
  "the-four-views-of-the-human-ability",
  "the-death-penalty-a-christian-perspective",
  "is-suicide-sinful",
  "can-christians-go-to-war",
  "homosexuality-what-does-the-bible-say",
  "is-gods-love-reckless",
  "does-god-change-his-mind",
  "the-propitiation-of-jesus-is-not-paganism",
  "freedom-isnt-freedom",
  "the-doctrines-of-grace",
  "the-vine-and-the-branch",
  "civic-ethnonationalism",
  "why-im-a-christian-secularist",
  "data-centres-are-not-our-enemy",
  "australia-must-remain-at-least-90-percent-anglo-celtic-european-aboriginal",
  "rhodesias-baptist-missionary-dr-jim-dearmore",
]);

export const isHiddenPostSlug = (slug: string | null | undefined): boolean =>
  Boolean(slug && HIDDEN_POST_SLUGS.has(slug));
