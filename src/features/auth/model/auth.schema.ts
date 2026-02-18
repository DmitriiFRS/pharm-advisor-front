import z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Некорректный email"),
	password: z.string().min(1, "Введите пароль"),
});

export const registerSchema = z.object({
	name: z.string().min(1, "Введите имя"),
	email: z.string().email("Некорректный email"),
	phoneNumber: z.string().min(12, "Введите корректный номер телефона"),
	password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export const recoverySchema = z.object({
	email: z.string().email("Некорректный email"),
});

export const resetPasswordSchema = z
	.object({
		password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
		confirmPassword: z.string().min(6, "Пароль должен быть не менее 6 символов"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});
