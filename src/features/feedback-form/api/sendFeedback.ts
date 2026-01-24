import { FeedbackFormValues } from "../model/useFeedbackForm";

export const sendFeedback = async (data: FeedbackFormValues) => {
	// TODO: Implement actual API call
	console.log("Sending feedback:", data);
	return new Promise((resolve) => setTimeout(resolve, 1000));
};
