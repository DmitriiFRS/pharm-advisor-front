import { notFound } from "next/navigation";

import { getOutsourcePage } from "@/features/outsource";
import { ApiServerError } from "@/shared/api/base.server";

interface OutsourceLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function OutsourceLayout({ children, params }: OutsourceLayoutProps) {
	const { locale } = await params;
	let response: Awaited<ReturnType<typeof getOutsourcePage>>;

	try {
		response = await getOutsourcePage(locale);
	} catch (error) {
		if (error instanceof ApiServerError && error.status === 404) notFound();
		return children;
	}

	if (!response.data) notFound();

	return children;
}
