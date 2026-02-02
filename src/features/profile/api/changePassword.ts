import { ChangePasswordFormValues } from "../model/useChangePasswordForm";

export const changePassword = async (data: ChangePasswordFormValues) => {
	const res = await fetch("/api/patch/changePassword", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(errorData.error || "Failed to update password");
	}
	return await res.json();
};
