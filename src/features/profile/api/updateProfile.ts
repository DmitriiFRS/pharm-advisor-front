import { ProfileFormValues } from "../model/useProfileForm";

export const updateProfile = async (data: ProfileFormValues) => {
	const res = await fetch("/api/patch/updateMe", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		throw new Error("Failed to update profile");
	}
	return await res.json();
};
