"use client";

import CommonInput from "@/shared/ui/form/CommonInput";
import { UserData } from "@/entities/user";
import { useContext } from "react";
import { useProfileForm } from "../model/useProfileForm";
import BlackButton from "@/shared/ui/BlackButton";
import PrimaryButton from "@/shared/ui/PrimaryButton";

import { logout } from "../api/logout";
import { useRouter } from "next/navigation";
import CommonPhoneInput from "@/shared/ui/form/CommonPhoneInput";
import { useTranslations } from "next-intl";

const ProfileForm = () => {
	const t = useTranslations("profile.form");
	const router = useRouter();
	const { setMe } = useContext(UserData);
	const {
		form: {
			register,
			handleSubmit,
			control,
			formState: { errors },
		},
		onSubmit,
		isLoading,
	} = useProfileForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[20px] p-10 mx-auto max-w-[485px] w-full mt-10 mb-30">
			<div className="flex flex-col gap-5">
				<CommonInput
					placeholder={t("name")}
					error={errors.name}
					{...register("name")}
					label={t("name")}
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
				/>
				<CommonInput
					placeholder={t("email")}
					error={errors.email}
					{...register("email")}
					label={t("email")}
					className="border rounded-[4px] border-[#a6a5a6]"
					labelClassName="text-14 opacity-60"
				/>
				<CommonPhoneInput
					control={control}
					name="phoneNumber"
					error={errors.phoneNumber}
					label={t("phone")}
					inputClassName="border-t-1! border-x-1! text-14! border-[#a6a5a6_!important] rounded-[4px_!important]"
					labelClassName="text-14 opacity-60"
				/>
				<div className="flex flex-col gap-1">
					<p className="text-14 opacity-60">{t("password")}</p>
					<BlackButton href="/profile/change-password" className="max-w-[153px] w-full max-h-10">
						{t("changePassword")}
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
					<span>{t("save")}</span>
				</PrimaryButton>
				<BlackButton className="mt-10 h-10! flex items-center justify-center min-w-48" onClick={() => logout(router, setMe)}>
					<span>{t("logout")}</span>
				</BlackButton>
			</div>
		</form>
	);
};

export default ProfileForm;
