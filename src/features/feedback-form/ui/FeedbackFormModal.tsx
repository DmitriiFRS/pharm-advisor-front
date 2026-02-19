"use client";

import { useState } from "react";

import { useFeedbackForm, FeedbackFormValues } from "../model/useFeedbackForm";
import CommonInput from "@/shared/ui/form/CommonInput";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { sendFeedback } from "../api/sendFeedback";

const FeedbackFormModal = ({ onSuccess }: { onSuccess: () => void }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useFeedbackForm();

	const onSubmit = async (data: FeedbackFormValues) => {
		try {
			setIsLoading(true);
			await sendFeedback(data);
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
				placeholder="Введите ваше имя"
				error={errors.name}
				{...register("name")}
				label="Ваше имя"
				className="border rounded-[5px]"
			/>
			<CommonPhoneInput
				control={control}
				name="phone"
				placeholder="Телефон"
				error={errors.phone}
				label="Ваш номер телефона"
				className="mt-5"
				inputClassName="border-x-1! border-t-1! rounded-[5px]! text-14!"
			/>
			<PrimaryButton
				type="submit"
				loading={isLoading}
				disabled={isLoading}
				className="mt-10 text-white flex items-center justify-center mx-auto"
			>
				<span className="">Оставить заявку</span>
			</PrimaryButton>
		</form>
	);
};

export default FeedbackFormModal;
