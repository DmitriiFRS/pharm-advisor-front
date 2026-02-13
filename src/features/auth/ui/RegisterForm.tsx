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

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Props {
	onLogin: () => void;
	onClose: (value: boolean) => void;
	onSuccessRegistration: (message?: string) => void;
}

const RegisterForm: React.FC<Props> = ({ onLogin, onSuccessRegistration }) => {
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			setIsLoading(true);
			const response = await authApi.register(data);
			if (response.data) {
				onSuccessRegistration();
			}
		} catch (error) {
			toast.error((error as Error).message || "Ошибка при регистрации");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="space-y-0">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">Регистрация</DialogTitle>
			</DialogHeader>
			<div className="w-full mt-5">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput label="Имя" placeholder="Введите имя" {...register("name")} error={errors.name} className="border" />
					<CommonInput label="Email" placeholder="Введите e-mail" {...register("email")} error={errors.email} className="border" />

					<div className="relative">
						<CommonInput
							label="Пароль"
							type="password"
							placeholder="Создайте свой пароль"
							{...register("password")}
							error={errors.password}
							className="border"
							withPasswordToggle
						/>
					</div>

					<PrimaryButton loading={isLoading} type="submit" className="w-full h-[50px] text-base mt-2 max-w-60 mx-auto">
						Зарегистрироваться
					</PrimaryButton>

					<div className="flex justify-center items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onLogin} className="hover:text-black-primary transition-colors">
							Уже зарегистрированы? Войти
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RegisterForm;
