"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
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
	onClose: (open: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ children, onRegister, onRecovery, onClose }) => {
	const { setMe } = useContext(UserData);
	const [showPassword, setShowPassword] = useState(false);
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
			toast.error((error as Error).message || "Ошибка при авторизации");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="space-y-0">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">Авторизация</DialogTitle>
			</DialogHeader>
			<div className="w-full">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput label="Email" placeholder="Введите ваш e-mail" {...register("email")} error={errors.email} className="border" />

					<div className="relative">
						<CommonInput
							label="Пароль"
							type={showPassword ? "text" : "password"}
							placeholder="Введите пароль"
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
					<PrimaryButton loading={isLoading} type="submit" className="w-full h-[50px] text-base mt-2 max-w-45 mx-auto">
						Войти
					</PrimaryButton>

					<div className="flex justify-between items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onRegister} className="hover:text-black-primary transition-colors">
							Зарегистрироваться
						</button>
						<button type="button" onClick={onRecovery} className="hover:text-black-primary transition-colors">
							Восстановить пароль
						</button>
					</div>
					{children}
				</form>
			</div>
		</>
	);
};

export default LoginForm;
