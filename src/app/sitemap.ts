import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: "https://pharmadvisor.uz",
			lastModified: new Date(),
			alternates: {
				languages: {
					ru: "https://pharmadvisor.uz",
					uz: "https://pharmadvisor.uz/uz",
				},
			},
		},
	];
}
