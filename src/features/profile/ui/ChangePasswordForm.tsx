"use client";

import CommonInput from "@/shared/ui/form/CommonInput";
import { useState } from "react";
import { ChangePasswordFormValues, useChangePasswordForm } from "../model/useChangePasswordForm";
import { changePassword } from "../api/changePassword";
import BlackButton from "@/shared/ui/BlackButton";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useChangePasswordForm();

	const onSubmit = async (data: ChangePasswordFormValues) => {
		try {
			setIsLoading(true);
			await changePassword(data);
			toast.success("Пароль успешно изменен");
			router.push("/profile");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message || "Ошибка при смене пароля");
			} else {
				toast.error("Ошибка при смене пароля");
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[20px] p-10 mx-auto max-w-[485px] w-full mt-10 mb-30">
			<div className="flex flex-col gap-5">
				<CommonInput
					placeholder="Введите текущий пароль"
					error={errors.password}
					{...register("password")}
					label="Текущий пароль"
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
					type="password"
					withPasswordToggle
				/>
				<CommonInput
					placeholder="Введите новый пароль"
					error={errors.newPassword}
					type="password"
					withPasswordToggle
					{...register("newPassword")}
					label="Новый пароль"
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
				/>
				<CommonInput
					placeholder="Повторите новый пароль"
					error={errors.confirmPassword}
					{...register("confirmPassword")}
					label="Повторите новый пароль"
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
					type="password"
					withPasswordToggle
				/>
			</div>
			<div className="flex items-center gap-5 mt-10 justify-center">
				<BlackButton className="w-full h-10!" onClick={() => router.back()} type="button">
					Отмена
				</BlackButton>
				<PrimaryButton type="submit" loading={isLoading} disabled={isLoading} className="w-full flex items-center justify-center">
					<span>Сохранить</span>
				</PrimaryButton>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
