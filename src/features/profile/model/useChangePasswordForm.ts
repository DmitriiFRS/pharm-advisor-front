"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePasswordSchema } from "./changePasswordSchema";
import { useState } from "react";
import { changePassword } from "../api/changePassword";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const useChangePasswordForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

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

	return {
		form,
		onSubmit,
		isLoading,
	};
};
