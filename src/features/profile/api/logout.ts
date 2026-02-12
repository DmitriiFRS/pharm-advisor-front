import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IUserData } from "@/entities/user";

export const logout = async (router: AppRouterInstance, setMe: (user: IUserData | null) => void) => {
	const response = await fetch("/api/auth/remove_token");
	if (response.ok || response.redirected) {
		setMe(null);
		router.push("/");
	}
};
