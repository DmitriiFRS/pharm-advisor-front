"use client";

import { useFeedbackForm, FeedbackFormValues } from "../model/useFeedbackForm";
import CommonInput from "@/shared/ui/form/CommonInput";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import CommonTextArea from "@/shared/ui/form/CommonTextArea";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { sendFeedback } from "../api/sendFeedback";
import { ChevronRight } from "lucide-react";

const FeedbackForm = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useFeedbackForm();

	const onSubmit = async (data: FeedbackFormValues) => {
		await sendFeedback(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
			<CommonInput placeholder="Ваше имя" error={errors.name} {...register("name")} />
			<CommonInput placeholder="Email" error={errors.email} {...register("email")} />
			<CommonPhoneInput control={control} name="phone" placeholder="Телефон" error={errors.phone} />
			<CommonTextArea placeholder="Ваш запрос" error={errors.message} {...register("message")} />
			<PrimaryButton className="mt-2 text-white flex items-center justify-center">
				<span className="mr-2">Оставить заявку</span>
				<ChevronRight size={15} />
			</PrimaryButton>
		</form>
	);
};

export default FeedbackForm;
