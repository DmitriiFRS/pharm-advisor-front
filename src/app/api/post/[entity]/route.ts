import { AUTH_ENDPOINTS } from "@/features/auth/api/auth.endpoints";
import { PROFILE_ENDPOINTS } from "@/features/profile/api/profile.endpoints";
import { bffErrorParse } from "@/shared/lib/errors/bffErrorParse";
import { getServerAuthContext } from "@/shared/lib/next.server";
import { NextResponse } from "next/server";

const ENDPOINT_MAP = {
	login: AUTH_ENDPOINTS.SIGN_IN,
	register: AUTH_ENDPOINTS.SIGN_UP,
	recovery: AUTH_ENDPOINTS.FORGOT_PASSWORD,
	updateMe: PROFILE_ENDPOINTS.UPDATE_ME,
} as const;

export async function POST(req: Request, { params }: { params: Promise<{ entity: string }> }) {
	const { accessToken, refreshToken, BACKEND_URL } = await getServerAuthContext();
	const { entity } = await params;
	if (!BACKEND_URL) {
		return NextResponse.json({ error: "Missing BACKEND_URL" }, { status: 500 });
	}
	if (ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP] === undefined) {
		console.error("Invalid entity type:", entity);
		return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });
	}

	const url = `${BACKEND_URL}/${ENDPOINT_MAP[entity as keyof typeof ENDPOINT_MAP]}`;
	console.log("url", url);
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(await req.json()),
	});
	if (!response.ok) {
		const error = await bffErrorParse(response);
		console.log(error);
		return NextResponse.json({ error }, { status: response.status });
	}
	return NextResponse.json(await response.json());
}
