"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { resetPasswordSchema } from "../model/auth.schema";
import { authApi } from "../api/auth.api";
import SuccessAuth from "./SuccessAuth";
import { useRouter, useSearchParams } from "next/navigation";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordFormValues) => {
		if (!token) {
			console.error("Token is missing");
			return;
		}
		setIsLoading(true);
		try {
			await authApi.resetPassword({
				password: data.password,
				token: token,
			});
			setSuccessMessage("Пароль успешно изменен");
			setIsSuccess(true);
		} catch (error) {
			console.error("Reset password error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<SuccessAuth
				successMessage={successMessage}
				setStep={() => router.push("/")}
				successMessageDescription="Теперь вы можете войти с новым паролем"
			/>
		);
	}

	return (
		<div className="w-full max-w-[400px] mx-auto p-6 bg-white rounded-lg shadow-md">
			<div className="space-y-4 mb-6">
				<h1 className="text-[28px] font-bold text-center leading-none">Создание нового пароля</h1>
				<p className="text-center text-sm md:text-base text-black-primary">Придумайте новый пароль для входа в аккаунт</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<CommonInput
					type="password"
					label=""
					placeholder="Введите новый пароль"
					{...register("password")}
					error={errors.password}
					className="border"
				/>
				<CommonInput
					type="password"
					label=""
					placeholder="Повторите новый пароль"
					{...register("confirmPassword")}
					error={errors.confirmPassword}
					className="border"
				/>

				<PrimaryButton loading={isLoading} type="submit" className="w-full text-base mt-4">
					Сохранить пароль
				</PrimaryButton>
			</form>
		</div>
	);
};

export default ResetPasswordForm;
