"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./profileSchema";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { UserData } from "@/entities/user";
import { updateProfile } from "../api/updateProfile";
import { toast } from "react-toastify";

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const useProfileForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { me } = useContext(UserData);
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: me?.name || "",
			email: me?.email || "",
			phoneNumber: me?.phoneNumber || "",
		},
	});

	useEffect(() => {
		if (me) {
			console.log(me);
			form.reset({
				name: me.name || "",
				email: me.email || "",
				phoneNumber: me.phoneNumber || "",
			});
		}
	}, [me, form]);

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

	return { form, onSubmit, isLoading };
};
