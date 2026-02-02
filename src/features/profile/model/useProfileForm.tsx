import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./profileSchema";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { UserData } from "@/entities/user";

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const useProfileForm = () => {
	const { me } = useContext(UserData);
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: me?.name || "",
			email: me?.email || "",
		},
	});

	useEffect(() => {
		if (me) {
			console.log(me);
			form.reset({
				name: me.name || "",
				email: me.email || "",
			});
		}
	}, [me, form]);

	return form;
};
