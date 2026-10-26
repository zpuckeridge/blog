import { articleHeadline } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

export interface JsonLdCollectionItem {
  datePublished?: string;
  headline: string;
  url: string;
}

export interface JsonLdInput {
  collectionItems?: JsonLdCollectionItem[];
  description?: string;
  imageUrls?: string[];
  keywords?: string[];
  modifiedTime?: string;
  pathname: string;
  publishedTime?: string;
  title?: string;
  type?: string;
  url?: string;
}

const personName = "Zacchary Puckeridge";

const sameAs = [
  "https://x.com/zpuckeridge/",
  "https://www.facebook.com/zpuckeridge/",
  "https://www.instagram.com/zpuckeridge/",
  "https://www.linkedin.com/in/zpuckeridge/",
  "https://github.com/zpuckeridge",
];

const personNode = (siteUrl: string, personId: string) => ({
  "@id": personId,
  "@type": "Person",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
    addressLocality: "Brisbane",
  },
  jobTitle: "IT Operations Lead",
  name: personName,
  sameAs,
  url: `${siteUrl}/`,
});

const withContext = (
  nodes: Record<string, unknown>[]
): Record<string, unknown> | null => {
  const [firstNode] = nodes;
  if (!firstNode) {
    return null;
  }
  if (nodes.length === 1) {
    return { "@context": "https://schema.org", ...firstNode };
  }
  return { "@context": "https://schema.org", "@graph": nodes };
};

const normalisePath = (pathname: string): string => {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const pushHome = (
  nodes: Record<string, unknown>[],
  pathname: string,
  siteUrl: string,
  personId: string
): void => {
  if (pathname !== "/") {
    return;
  }
  nodes.push(personNode(siteUrl, personId), {
    "@type": "WebSite",
    author: { "@id": personId },
    name: "zacchary.me",
    url: `${siteUrl}/`,
  });
};

const pushProfile = (
  nodes: Record<string, unknown>[],
  pathname: string,
  siteUrl: string,
  personId: string,
  url: string | undefined
): void => {
  if (pathname !== "/about" && pathname !== "/cv") {
    return;
  }
  nodes.push(personNode(siteUrl, personId), {
    "@type": "ProfilePage",
    inLanguage: "en-AU",
    mainEntity: { "@id": personId },
    name: pathname === "/cv" ? "CV" : "About",
    url: url ?? `${siteUrl}${pathname}`,
  });
};

const WEB_PAGE_NAMES: Record<string, string> = {
  "/about/books": "Books",
  "/about/credits": "Credits",
  "/about/movies": "Movies",
  "/activity": "Activity",
  "/colophon": "Colophon",
  "/imprint": "Imprint",
  "/projects": "Projects",
  "/uses": "Uses",
};

const pushWebPage = (
  nodes: Record<string, unknown>[],
  input: JsonLdInput,
  pathname: string,
  siteUrl: string
): void => {
  const name = WEB_PAGE_NAMES[pathname];
  if (!name) {
    return;
  }

  const page: Record<string, unknown> = {
    "@type": "WebPage",
    inLanguage: "en-AU",
    name,
    url: input.url ?? `${siteUrl}${pathname}`,
  };
  if (input.description) {
    page.description = input.description;
  }
  nodes.push(page);
};

const postingFromItem = (item: JsonLdCollectionItem) => ({
  "@type": "BlogPosting",
  ...(item.datePublished ? { datePublished: item.datePublished } : {}),
  headline: item.headline,
  url: item.url,
});

const pushTimeline = (
  nodes: Record<string, unknown>[],
  input: JsonLdInput,
  pathname: string,
  siteUrl: string
): void => {
  if (pathname !== "/timeline" || !input.collectionItems?.length) {
    return;
  }
  nodes.push({
    "@type": ["CollectionPage", "Blog"],
    blogPost: input.collectionItems.map((item) => postingFromItem(item)),
    inLanguage: "en-AU",
    name: "Timeline",
    url: input.url ?? `${siteUrl}/timeline`,
  });
};

const pushTagCollection = (
  nodes: Record<string, unknown>[],
  input: JsonLdInput,
  pathname: string,
  siteUrl: string
): void => {
  if (
    !pathname.startsWith("/timeline/tag/") ||
    !input.collectionItems?.length
  ) {
    return;
  }

  const page: Record<string, unknown> = {
    "@type": "CollectionPage",
    hasPart: input.collectionItems.map((item) => postingFromItem(item)),
    inLanguage: "en-AU",
    name: input.title ? articleHeadline(input.title) : "Posts",
    url: input.url ?? `${siteUrl}${pathname}`,
  };
  if (input.description) {
    page.description = input.description;
  }
  nodes.push(page);
};

const pushArticle = (
  nodes: Record<string, unknown>[],
  input: JsonLdInput,
  siteUrl: string
): void => {
  if (input.type !== "article") {
    return;
  }

  const headline = articleHeadline(
    typeof input.title === "string" ? input.title : ""
  );
  const article: Record<string, unknown> = {
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: personName,
      url: `${siteUrl}/`,
    },
    headline,
    inLanguage: "en-AU",
    publisher: {
      "@type": "Person",
      name: personName,
      url: `${siteUrl}/`,
    },
  };

  if (input.description) {
    article.description = input.description;
  }
  if (input.publishedTime) {
    article.datePublished = input.publishedTime;
  }
  if (input.modifiedTime) {
    article.dateModified = input.modifiedTime;
  }
  if (input.url) {
    article.mainEntityOfPage = input.url;
    article.url = input.url;
  }
  if (input.imageUrls?.length) {
    article.image = input.imageUrls;
  }
  if (input.keywords?.length) {
    article.keywords = input.keywords.join(", ");
  }

  nodes.push(article);
};

export const buildJsonLdPayload = (
  input: JsonLdInput
): Record<string, unknown> | null => {
  const siteUrl = getSiteUrl().replace(/\/$/u, "");
  const personId = `${siteUrl}/#person`;
  const nodes: Record<string, unknown>[] = [];
  const pathname = normalisePath(input.pathname);

  pushHome(nodes, pathname, siteUrl, personId);
  pushProfile(nodes, pathname, siteUrl, personId, input.url);
  pushWebPage(nodes, input, pathname, siteUrl);
  pushTimeline(nodes, input, pathname, siteUrl);
  pushTagCollection(nodes, input, pathname, siteUrl);
  pushArticle(nodes, input, siteUrl);

  return withContext(nodes);
};
