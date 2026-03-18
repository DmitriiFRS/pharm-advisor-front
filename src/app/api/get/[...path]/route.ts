import { CONTACTS_ENDPOINTS } from "@/entities/company/api/contacts.endpoints";
import { KNOWLEDGE_BASE_ENDPOINTS } from "@/features/knowledge-base/api/knowledge-base.endpoints";
import { FAQ_ENDPOINTS } from "@/features/faq/api/faq.endpoints";
import { getServerAuthContext } from "@/shared/lib/next.server";
import { NextRequest, NextResponse } from "next/server";
import { SERVICES_ENDPOINTS } from "@/features/services";

const ENDPOINT_MAP: Record<string, string> = {
	user: "/user",
	articles: KNOWLEDGE_BASE_ENDPOINTS.ARTICLES,
	contacts: CONTACTS_ENDPOINTS.CONTACTS,
	faqs: FAQ_ENDPOINTS.FAQS,
	services: SERVICES_ENDPOINTS.SERVICES,
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, { params }: { params: Promise<any> }) {
	console.log("get request");
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const awaitedParams = await params;
	const entityPathArray = awaitedParams.path;
	if (!entityPathArray || entityPathArray.length === 0) {
		return NextResponse.json({ error: "Invalid API route. Entity path is missing." }, { status: 400 });
	}
	const [entity, ...dynamicParts] = entityPathArray;
	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}
	if (ENDPOINT_MAP[entity] === undefined) {
		console.error("Invalid entity type:", entity);
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}
	const basePath = ENDPOINT_MAP[entity];
	const searchParams = req.nextUrl.searchParams.toString();
	const cleanedBasePath = basePath.replace(/^\//, "");
	const finalDynamicPath = dynamicParts.join("/");
	let url = `${BACKEND_URL}/${cleanedBasePath}`;
	if (finalDynamicPath) {
		url += `/${finalDynamicPath}`;
	}
	if (searchParams) {
		url += `?${searchParams}`;
	}
	const acceptLanguage = req.headers.get("accept-language");

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				...(acceptLanguage && { "accept-language": acceptLanguage }),
			},
		});
		const data = await response.json();
		if (!response.ok) {
			return NextResponse.json(data || { error: `Backend Error: ${response.statusText}` }, { status: response.status });
		}
		return NextResponse.json(data, { status: 200 });
	} catch (err) {
		console.error("Proxy API Error:", err);
		return NextResponse.json({ error: "Internal Server Error", details: String(err) }, { status: 500 });
	}
}
