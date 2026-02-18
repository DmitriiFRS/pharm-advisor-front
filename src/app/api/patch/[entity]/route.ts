import { PROFILE_ENDPOINTS } from "@/features/profile/api/profile.endpoints";
import { bffErrorParse } from "@/shared/lib/errors/bffErrorParse";
import { getServerAuthContext } from "@/shared/lib/next.server";
import { NextResponse } from "next/server";

const ENDPOINT_MAP = {
	updateMe: PROFILE_ENDPOINTS.UPDATE_ME,
	changePassword: PROFILE_ENDPOINTS.CHANGE_PASSWORD,
} as const;

export async function PATCH(req: Request, { params }: { params: Promise<{ entity: string }> }) {
	const { accessToken, BACKEND_URL } = await getServerAuthContext();
	const { entity } = await params;
	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}
	if (ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP] === undefined) {
		console.error("Invalid entity type:", entity);
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}

	const url = `${BACKEND_URL}/${ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP]}`;
	const body = await req.json();
	console.log(body);
	const response = await fetch(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		const error = await bffErrorParse(response);
		return NextResponse.json({ error }, { status: response.status });
	}
	return NextResponse.json(await response.json());
}
