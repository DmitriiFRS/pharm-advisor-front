"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "./feedbackSchema";
import { z } from "zod";

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const useFeedbackForm = () => {
	const form = useForm<FeedbackFormValues>({
		resolver: zodResolver(feedbackSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	return form;
};
