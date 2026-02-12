import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "4000",
			},
			{
				protocol: "https",
				hostname: "pharmadvisor.uz",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
