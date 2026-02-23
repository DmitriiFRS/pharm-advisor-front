import { FeedbackFormValues } from "../model/useFeedbackForm";

export const sendFeedback = async (data: FeedbackFormValues, pathname: string, referrer: string, siteSection: string) => {
	const res = await fetch("/api/feedback", {
		method: "POST",
		body: JSON.stringify({ ...data, pathname, referrer, siteSection }),
	});

	if (!res.ok) {
		throw new Error("Failed to send feedback");
	}

	return res.json();
};
