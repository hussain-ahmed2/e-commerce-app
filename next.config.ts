import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "cdn.dummyjson.com",
        protocol: "https",
			},
		],
	},
};

export default nextConfig;
