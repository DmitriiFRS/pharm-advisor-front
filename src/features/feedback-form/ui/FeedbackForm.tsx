"use client";

import { useState } from "react";
import { useFeedbackForm, FeedbackFormValues } from "../model/useFeedbackForm";
import CommonInput from "@/shared/ui/form/CommonInput";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import CommonTextArea from "@/shared/ui/form/CommonTextArea";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { sendFeedback } from "../api/sendFeedback";
import { ChevronRight } from "lucide-react";
import FeedbackSuccess from "./FeedbackSuccess";

import { useTranslations } from "next-intl";

const FeedbackForm = () => {
	const t = useTranslations("feedback");
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useFeedbackForm();

	const onSubmit = async (data: FeedbackFormValues) => {
		try {
			setIsLoading(true);
			await sendFeedback(data);
			reset();
			setIsSuccess(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return <FeedbackSuccess onClose={() => setIsSuccess(false)} />;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
			<CommonInput placeholder={t("name")} error={errors.name} {...register("name")} />
			<CommonInput placeholder={t("email")} error={errors.email} {...register("email")} />
			<CommonPhoneInput control={control} name="phone" placeholder={t("phonePlaceholder")} error={errors.phone} />
			<CommonTextArea placeholder={t("messagePlaceholder")} error={errors.message} {...register("message")} />
			<PrimaryButton type="submit" loading={isLoading} disabled={isLoading} className="mt-2 text-white flex items-center justify-center">
				<span className="mr-2">{t("submitButton")}</span>
				<ChevronRight size={15} />
			</PrimaryButton>
		</form>
	);
};

export default FeedbackForm;
