import z from "zod";

export const feedbackSchema = z.object({
	name: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
	email: z.string().email("Неверный формат email").optional(),
	phone: z.string().min(10, "Минимум 10 символов").max(15, "Максимум 15 символов"),
	message: z.string().min(10, "Минимум 10 символов").max(500, "Максимум 500 символов").optional(),
});
