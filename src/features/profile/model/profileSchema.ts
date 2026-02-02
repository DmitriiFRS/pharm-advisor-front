import z from "zod";

export const profileSchema = z.object({
	name: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
	email: z.string(),
	// phone: z.string().min(10, "Минимум 10 символов").max(15, "Максимум 15 символов"),
});
