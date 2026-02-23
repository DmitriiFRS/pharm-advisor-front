"use client";

import { useState } from "react";

import { useFeedbackForm, FeedbackFormValues } from "../model/useFeedbackForm";
import CommonInput from "@/shared/ui/form/CommonInput";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { sendFeedback } from "../api/sendFeedback";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const FeedbackFormModal = ({ onSuccess, siteSection }: { onSuccess: () => void; siteSection: string }) => {
	const pathname = usePathname();
	const t = useTranslations("feedback");
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useFeedbackForm();

	const onSubmit = async (data: FeedbackFormValues) => {
		const referrer = sessionStorage.getItem("referrer") || "нет";
		const sanitizedPathname = pathname === "/" ? "Главная страница" : pathname;
		try {
			setIsLoading(true);
			await sendFeedback(data, sanitizedPathname, referrer, siteSection);
			reset();
			onSuccess();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
			<CommonInput
				placeholder={t("namePlaceholder")}
				error={errors.name}
				{...register("name")}
				label={t("name")}
				className="border rounded-[5px]"
			/>
			<CommonPhoneInput
				control={control}
				name="phone"
				placeholder={t("phonePlaceholder")}
				error={errors.phone}
				label={t("phone")}
				className="mt-5"
				inputClassName="border-x-1! border-t-1! rounded-[5px]! text-14!"
			/>
			<PrimaryButton
				type="submit"
				loading={isLoading}
				disabled={isLoading}
				className="mt-10 text-white flex items-center justify-center mx-auto"
			>
				<span className="">{t("submitButton")}</span>
			</PrimaryButton>
		</form>
	);
};

export default FeedbackFormModal;
