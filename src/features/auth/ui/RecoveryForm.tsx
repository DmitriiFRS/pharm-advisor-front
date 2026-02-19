"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { recoverySchema } from "../model/auth.schema";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { authApi } from "../api/auth.api";
import { toast } from "react-toastify";

import { useTranslations } from "next-intl";

type RecoveryFormValues = z.infer<typeof recoverySchema>;

interface Props {
	onLogin: () => void;
	onRegister: () => void;
	onSuccessRecovery: (message?: string) => void;
}

const RecoveryForm: React.FC<Props> = ({ onLogin, onRegister, onSuccessRecovery }) => {
	const t = useTranslations("auth");
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RecoveryFormValues>({
		resolver: zodResolver(recoverySchema),
	});

	const onSubmit = async (data: RecoveryFormValues) => {
		try {
			setIsLoading(true);
			const response = await authApi.recovery(data);
			if (response.data) {
				console.log(response.data);
				onSuccessRecovery();
			}
		} catch (error) {
			toast.error((error as Error).message || t("errorRegister")); // Using same error message key or create new one
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="space-y-4">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">{t("recoveryTitle")}</DialogTitle>
				<DialogDescription className="text-center text-sm md:text-base text-black-primary">
					{t("recoveryDescription")}
				</DialogDescription>
			</DialogHeader>
			<div className="w-full mt-5">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput label="" placeholder={t("emailPlaceholder")} {...register("email")} error={errors.email} className="border" />

					<PrimaryButton loading={isLoading} type="submit" className="w-full text-base mt-2 max-w-60 mx-auto">
						{t("recoveryButton")}
					</PrimaryButton>

					<div className="flex justify-between items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onLogin} className="hover:text-black-primary transition-colors">
							{t("loginButton")}
						</button>
						<button type="button" onClick={onRegister} className="hover:text-black-primary transition-colors">
							{t("registerButton")}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RecoveryForm;
