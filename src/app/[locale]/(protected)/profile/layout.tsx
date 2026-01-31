"use server";

import { checkAuth } from "@/features/auth/lib/checkAuth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const { user } = await checkAuth();
	console.log("user data", user);
	if (!user) {
		redirect("/");
	}
	return <div>{children}</div>;
}
