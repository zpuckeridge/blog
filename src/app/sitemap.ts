import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
	? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
	: "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
	const routesMap = [""].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routesMap];
}
