"use client";

import CommonInput from "@/shared/ui/form/CommonInput";
import { UserData } from "@/entities/user";
import { useContext, useState } from "react";
import { ProfileFormValues, useProfileForm } from "../model/useProfileForm";
import { updateProfile } from "../api/updateProfile";
import BlackButton from "@/shared/ui/BlackButton";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { toast } from "react-toastify";

import { logout } from "../api/logout";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { setMe } = useContext(UserData);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useProfileForm();

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			setIsLoading(true);
			await updateProfile(data);
			toast.success("Профиль успешно обновлен");
		} catch {
			toast.error("Ошибка при обновлении профиля");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[20px] p-10 mx-auto max-w-[485px] w-full mt-10 mb-30">
			<div className="flex flex-col gap-5">
				<CommonInput
					placeholder="Имя"
					error={errors.name}
					{...register("name")}
					label="Имя"
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
				/>
				<CommonInput
					placeholder="Email"
					error={errors.email}
					{...register("email")}
					label="Email"
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
				/>
				<div className="flex flex-col gap-1">
					<p className="text-14 opacity-60">Пароль</p>
					<BlackButton href="/profile/change-password" className="max-w-[153px] w-full h-7.5! text-10!">
						Изменить пароль
					</BlackButton>
				</div>
			</div>
			<div className="flex gap-5 justify-between">
				<PrimaryButton
					type="submit"
					loading={isLoading}
					disabled={isLoading}
					className="mt-10 flex items-center justify-center min-w-48"
				>
					<span>Сохранить</span>
				</PrimaryButton>
				<BlackButton className="mt-10 h-10! flex items-center justify-center min-w-48 text-10!" onClick={() => logout(router, setMe)}>
					<span>Выйти</span>
				</BlackButton>
			</div>
		</form>
	);
};

export default ProfileForm;
