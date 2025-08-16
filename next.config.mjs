/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./image-loader.ts",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
			{
				protocol: "https",
				hostname: "image.mux.com",
			},
			{
				protocol: "https",
				hostname: "media.discordapp.net",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
			},
			{
				protocol: "https",
				hostname: "x.com",
			},
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
			},
			{
				protocol: "https",
				hostname: "abs.twimg.com",
			},
		],
	},
};

export default nextConfig;
