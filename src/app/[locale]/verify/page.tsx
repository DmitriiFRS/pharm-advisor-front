import { redirect } from "next/navigation";
import SuccessVerify from "@/features/auth/ui/SuccessVerify";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyPage({ searchParams }: Props) {
	const { token } = await searchParams;

	if (!token || Array.isArray(token)) {
		redirect("/");
	}

	let isVerified = false;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (response.ok) {
			isVerified = true;
		}
	} catch (error) {
		console.error("Verification error:", error);
	}

	if (!isVerified) {
		redirect("/");
	}

	return <SuccessVerify />;
}
