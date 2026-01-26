import z from "zod";

export const loginSchema = z.object({
	email: z.string().email("Некорректный email"),
	password: z.string().min(1, "Введите пароль"),
});

export const registerSchema = z.object({
	name: z.string().min(1, "Введите имя"),
	email: z.string().email("Некорректный email"),
	password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});

export const recoverySchema = z.object({
	email: z.string().email("Некорректный email"),
});
