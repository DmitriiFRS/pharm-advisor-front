"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { registerSchema } from "../model/auth.schema";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { authApi } from "../api/auth.api";
import { toast } from "react-toastify";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import CommonCheckbox from "@/shared/ui/form/CommonCheckbox";
import Link from "next/link";

import { useTranslations } from "next-intl";

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Props {
	onLogin: () => void;
	onClose: (value: boolean) => void;
	onSuccessRegistration: (message?: string) => void;
}

const RegisterForm: React.FC<Props> = ({ onLogin, onSuccessRegistration }) => {
	const t = useTranslations("auth");
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			termsAccepted: false,
		},
	});

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			setIsLoading(true);
			const response = await authApi.register(data);
			if (response.data) {
				onSuccessRegistration();
			}
		} catch (error) {
			toast.error((error as Error).message || t("errorRegister"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="space-y-0">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">{t("registerTitle")}</DialogTitle>
			</DialogHeader>
			<div className="w-full mt-5">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput
						label={t("name")}
						placeholder={t("namePlaceholder")}
						{...register("name")}
						error={errors.name}
						className="border"
					/>
					<CommonInput
						label={t("email")}
						placeholder={t("emailPlaceholder")}
						{...register("email")}
						error={errors.email}
						className="border"
					/>
					<CommonPhoneInput
						control={control}
						name="phoneNumber"
						label={t("phone")}
						placeholder={t("phonePlaceholder")}
						error={errors.phoneNumber}
						className=""
						inputClassName="border-t-1! border-x-1! rounded-[5px_!important]"
					/>

					<div className="relative">
						<CommonInput
							label={t("password")}
							type="password"
							placeholder={t("createPasswordPlaceholder")}
							{...register("password")}
							error={errors.password}
							className="border"
							withPasswordToggle
						/>
					</div>

					<CommonCheckbox name="termsAccepted" control={control} error={errors.termsAccepted}>
						{t("termsAccepted")}{" "}
						<Link href="/privacy" className="text-[#7da9ce] hover:underline" target="_blank">
							{t("termsPolicy")}
						</Link>
					</CommonCheckbox>

					<PrimaryButton loading={isLoading} type="submit" className="w-full text-base mt-2 max-w-60 mx-auto">
						{t("registerButton")}
					</PrimaryButton>

					<div className="flex justify-center items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onLogin} className="hover:text-black-primary transition-colors">
							<span>{t("alreadyRegistered")}</span> <span className="font-semibold text-black-primary">{t("login")}</span>
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterForm;
