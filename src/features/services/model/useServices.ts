"use client";

import { useData } from "@/shared/api/hooks/useData";
import { SERVICES_ENDPOINTS } from "../api/services.endpoints";
import { IService } from "../types/services.types";

export const useServices = () => {
	const { data, loading, error, refetch } = useData<{ data: IService[] }>(SERVICES_ENDPOINTS.SERVICES);

	return {
		services: data?.data || [],
		loading,
		error,
		refetch,
	};
};
