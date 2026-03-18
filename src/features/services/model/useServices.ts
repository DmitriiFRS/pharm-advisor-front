"use client";

import { useData } from "@/shared/api/hooks/useData";
import { SERVICES_ENDPOINTS } from "../api/services.endpoints";
import { IService } from "../types/services.types";
import { useLocale } from "next-intl";

export const useServices = () => {
	const locale = useLocale();
	const { data, loading, error, refetch } = useData<{ data: IService[] }>(SERVICES_ENDPOINTS.SERVICES, {}, locale);

	return {
		services: data?.data || [],
		loading,
		error,
		refetch,
	};
};
