import z from "zod";

export const profileSchema = z.object({
	name: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
	email: z.string(),
	phoneNumber: z.string().min(12, "Введите корректный номер телефона"),
});
