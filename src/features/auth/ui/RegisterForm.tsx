"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { registerSchema } from "../model/auth.schema";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type RegisterFormValues = z.infer<typeof registerSchema>;

interface Props {
	onLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onLogin }) => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterFormValues) => {
		console.log("Register data:", data);
		// TODO: Implement registration logic
	};

	return (
		<>
			<DialogHeader className="space-y-0">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">Регистрация</DialogTitle>
			</DialogHeader>
			<div className="w-full">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput label="Имя" placeholder="Введите имя" {...register("name")} error={errors.name} className="border" />
					<CommonInput label="Email" placeholder="Введите e-mail" {...register("email")} error={errors.email} className="border" />

					<div className="relative">
						<CommonInput
							label="Пароль"
							type={showPassword ? "text" : "password"}
							placeholder="Создайте свой пароль"
							{...register("password")}
							error={errors.password}
							className="border"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-600"
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>

					<PrimaryButton className="w-full h-[50px] text-base mt-2 max-w-60 mx-auto">Зарегистрироваться</PrimaryButton>

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
