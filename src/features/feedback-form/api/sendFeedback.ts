import { FeedbackFormValues } from "../model/useFeedbackForm";

export const sendFeedback = async (data: FeedbackFormValues) => {
	const res = await fetch("/api/feedback", {
		method: "POST",
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		throw new Error("Failed to send feedback");
	}

	return res.json();
};
