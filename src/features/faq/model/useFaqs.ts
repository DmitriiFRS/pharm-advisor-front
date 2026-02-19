import { useData } from "@/shared/api/hooks/useData";
import { IFaq } from "../types/faq.types";
import { FAQ_ENDPOINTS } from "../api/faq.endpoints";

export const useFaqs = () => {
	const { data, loading, error, refetch } = useData<{ data: IFaq[] }>(FAQ_ENDPOINTS.FAQS);

	return {
		faqs: data?.data || [],
		loading,
		error,
		refetch,
	};
};
