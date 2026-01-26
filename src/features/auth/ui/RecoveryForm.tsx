"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CommonInput from "@/shared/ui/form/CommonInput";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { recoverySchema } from "../model/auth.schema";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type RecoveryFormValues = z.infer<typeof recoverySchema>;

interface Props {
	onLogin: () => void;
	onRegister: () => void;
}

const RecoveryForm: React.FC<Props> = ({ onLogin, onRegister }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RecoveryFormValues>({
		resolver: zodResolver(recoverySchema),
	});

	const onSubmit = (data: RecoveryFormValues) => {
		console.log("Recovery data:", data);
		// TODO: Implement recovery logic
	};

	return (
		<>
			<DialogHeader className="space-y-4">
				<DialogTitle className="text-[28px] font-bold text-center leading-none">Восстановление пароля</DialogTitle>
				<DialogDescription className="text-center text-sm md:text-base text-black-primary">
					Введите email, который вы использовали при регистрации
				</DialogDescription>
			</DialogHeader>
			<div className="w-full mt-6">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<CommonInput label="" placeholder="Введите e-mail" {...register("email")} error={errors.email} className="border" />

					<PrimaryButton className="w-full h-[50px] text-base mt-2 max-w-60 mx-auto">Восстановить</PrimaryButton>

					<div className="flex justify-between items-center text-xs md:text-sm text-[#9E9E9E] mt-2">
						<button type="button" onClick={onLogin} className="hover:text-black-primary transition-colors">
							Войти
						</button>
						<button type="button" onClick={onRegister} className="hover:text-black-primary transition-colors">
							Зарегистрироваться
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default RecoveryForm;
