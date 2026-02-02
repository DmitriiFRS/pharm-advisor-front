import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePasswordSchema } from "./changePasswordSchema";

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const useChangePasswordForm = () => {
	const form = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	return form;
};
