import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async (router: AppRouterInstance) => {
	const response = await fetch("/api/auth/remove_token");
	if (response.ok || response.redirected) {
		router.push("/");
	}
};
