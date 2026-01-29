import { apiClientService } from "@/shared/api/base.client";
import { LoginFormValues, RegisterFormValues, RecoveryFormValues } from "../types/types";

const api = apiClientService();

export const authApi = {
	login: (data: LoginFormValues) => {
		return api.post<LoginFormValues>({
			entity: "login",
			data,
		});
	},
	register: (data: RegisterFormValues) => {
		return api.post<RegisterFormValues>({
			entity: "register",
			data,
		});
	},
	recovery: (data: RecoveryFormValues) => {
		return api.post<RecoveryFormValues>({
			entity: "recovery",
			data,
		});
	},
};
