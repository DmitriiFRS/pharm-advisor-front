import ResetPasswordForm from "@/features/auth/ui/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<Suspense fallback={<div>Loading...</div>}>
				<ResetPasswordForm />
			</Suspense>
		</div>
	);
}
