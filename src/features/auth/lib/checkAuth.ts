import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authServerApi } from "../api/auth.server";

export async function checkAuth() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	// Middleware handles token refresh and validation for protected routes.
	// We just need to fetch the user here.

	if (!accessToken) {
		return { user: null };
	}

	try {
		const userData = await authServerApi.getUser(accessToken);
		if (userData && userData.id) {
			return { user: userData };
		}

		// If getUser fails despite middleware check (e.g. edge case), redirect to logout
		redirect("/api/auth/remove_token");
	} catch (error) {
		console.error("Ошибка авторизации (RSC):", error);
		redirect("/api/auth/remove_token");
	}
}

export async function setAuthCookies(accessToken: string, refreshToken: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/set_token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ accessToken, refreshToken }),
		cache: "no-store",
	});

	if (!response.ok) {
		return false;
	}
}

export async function clearAuthCookies() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/remove_token`, {
		method: "POST",
		cache: "no-store",
	});
	if (!response.ok) {
		throw new Error("Failed to clear cookies via API");
	}
}
