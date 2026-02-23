"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "./feedbackSchema";
import { z } from "zod";
import { useContext } from "react";
import { UserData } from "@/entities/user";

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const useFeedbackForm = () => {
	const { me } = useContext(UserData);
	const form = useForm<FeedbackFormValues>({
		resolver: zodResolver(feedbackSchema),
		values: {
			name: me?.name || "",
			email: me?.email || "",
			phone: me?.phoneNumber || "",
			message: "",
		},
	});

	return form;
};
