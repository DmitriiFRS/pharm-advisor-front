"use client";

import { useTranslations } from "next-intl";

import { useFaqs } from "../model/useFaqs";
import Faq from "./Faq";

const FaqWithData = () => {
	const t = useTranslations("homepage.faq");
	const { faqs } = useFaqs();

	return <Faq title={t("title")} items={faqs} />;
};

export default FaqWithData;
