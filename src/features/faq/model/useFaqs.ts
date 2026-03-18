import { useData } from "@/shared/api/hooks/useData";
import { IFaq } from "../types/faq.types";
import { FAQ_ENDPOINTS } from "../api/faq.endpoints";
import { useLocale } from "next-intl";

export const useFaqs = () => {
	const locale = useLocale();
	const { data, loading, error, refetch } = useData<{ data: IFaq[] }>(FAQ_ENDPOINTS.FAQS, {}, locale);

	return {
		faqs: data?.data || [],
		loading,
		error,
		refetch,
	};
};
