"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useTranslations } from "next-intl";

import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { loginSchema } from "../model/auth.schema";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserData } from "@/entities/user";

type LoginFormValues = z.infer<typeof loginSchema>;

interface Props {
	children?: React.ReactNode;
	onRegister: () => void;
	onRecovery: () => void;
	onSuccessRegistration: (message?: string) => void;
	onClose: (open: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ children, onRegister, onRecovery, onSuccessRegistration, onClose }) => {
	const t = useTranslations("auth");
	const { setMe } = useContext(UserData);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		try {
			setIsLoading(true);
			const response = await authApi.login(data);
			if (response.data) {
				await fetch("/api/auth/set_token", {
					method: "POST",
					body: JSON.stringify(response.data),
				});
				setMe(response.data.user);
				router.push("/profile");
				onClose(false);
			}
		} catch (error: unknown) {
			const err = error as { status?: number; response?: { status?: number; data?: { message?: string } }; message?: string };
			if (err?.status === 403 || err?.response?.status === 403 || err?.message?.includes("не подтвержден")) {
				onSuccessRegistration(err?.response?.data?.message || err?.message || t("emailNotConfirmed"));
			} else {
				toast.error((error as Error).message || t("errorAuth"));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="space-y-0">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">{t("loginTitle")}</DialogTitle>
			</DialogHeader>
			<div className="w-full mt-5">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput
						label={t("email")}
						placeholder={t("emailPlaceholder")}
						{...register("email")}
						error={errors.email}
						className="border"
					/>

					<CommonInput
						label={t("password")}
						type="password"
						withPasswordToggle
						placeholder={t("passwordPlaceholder")}
						{...register("password")}
						error={errors.password}
						className="border"
					/>

					<PrimaryButton loading={isLoading} type="submit" className="w-full text-base mt-2 max-w-45 mx-auto">
						{t("loginButton")}
					</PrimaryButton>

					<div className="flex justify-between items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onRegister} className="hover:text-black-primary transition-colors">
							{t("toRegister")}
						</button>
						<button type="button" onClick={onRecovery} className="hover:text-black-primary transition-colors">
							{t("toRecovery")}
						</button>
					</div>
					{children}
				</form>
			</div>
		</>
	);
};

export default LoginForm;
