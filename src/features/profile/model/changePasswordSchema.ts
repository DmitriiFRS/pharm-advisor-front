import { z } from "zod";

export const changePasswordSchema = z
	.object({
		password: z.string().min(1, "Введите текущий пароль"),
		newPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
		confirmPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});
