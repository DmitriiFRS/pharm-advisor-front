import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const PROTECTED_ROUTES = ["/profile", "/checkout", "/orders"];
const AUTH_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the path is protected
	// Remove locale prefix to check the path against protected routes
	const pathnameWithoutLocale = pathname.replace(/^\/(ru|uz)/, "");
	const isProtected = PROTECTED_ROUTES.some((route) => pathnameWithoutLocale.startsWith(route));

	const accessToken = request.cookies.get("accessToken")?.value;
	const refreshToken = request.cookies.get("refreshToken")?.value;

	if (!accessToken || !refreshToken) {
		if (isProtected) {
			return redirectToLogout(request);
		}
		return handleI18nRouting(request);
	}

	// Verify access token
	const isAccessTokenValid = await verifyAccessToken(accessToken);

	if (isAccessTokenValid) {
		return handleI18nRouting(request);
	}

	// Try refreshing token
	const newTokens = await refreshTokens(accessToken, refreshToken);

	if (newTokens) {
		// Update request cookies so RSCs see the new token
		request.cookies.set("accessToken", newTokens.accessToken);
		request.cookies.set("refreshToken", newTokens.refreshToken);

		// Process response with updated request
		const response = handleI18nRouting(request);

		// Set new cookies on the response for the browser
		response.cookies.set("accessToken", newTokens.accessToken);
		response.cookies.set("refreshToken", newTokens.refreshToken);

		return response;
	}
	if (isProtected) {
		return redirectToLogout(request);
	}
	const response = handleI18nRouting(request);
	response.cookies.delete("accessToken");
	response.cookies.delete("refreshToken");
	return response;
}

function redirectToLogout(request: NextRequest) {
	// Redirect to the remove_token endpoint to clear cookies and go to home
	const logoutUrl = new URL("/api/auth/remove_token", request.url);
	return NextResponse.redirect(logoutUrl);
}

async function verifyAccessToken(accessToken: string) {
	try {
		const response = await fetch(`${AUTH_API_URL}/users/get-me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});
		return response.ok;
	} catch {
		return false;
	}
}

async function refreshTokens(accessToken: string, refreshToken: string) {
	try {
		const response = await fetch(`${AUTH_API_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ refreshToken }),
			cache: "no-store",
		});

		if (response.ok) {
			const data = await response.json();
			return {
				accessToken: data.data.accessToken,
				refreshToken: data.data.refreshToken,
			};
		}
		return null;
	} catch {
		return null;
	}
}

export const config = {
	matcher: [
		// Match all pathnames except for
		// - … if they start with `/api`, `/_next` or `/_vercel`
		// - … the ones containing a dot (e.g. `favicon.ico`)
		"/((?!api|_next|_vercel|.*\\..*).*)",
	],
};
