"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Container from "@/shared/ui/Container";
import { useFaqs } from "@/features/faq/model/useFaqs";
import { useTranslations } from "next-intl";

const Faq = () => {
	const t = useTranslations("homepage.faq");
	const { faqs } = useFaqs();

	return (
		faqs.length > 0 && (
			<section className="py-15 md:py-30">
				<Container>
					<h2 className="mb-8 md:mb-15 font-semibold text-20 md:text-40 leading-100 tracking-neg-3 md:tracking-neg-2 text-center text-black">
						{t("title")}
					</h2>
					<Accordion type="single" collapsible className="flex flex-col gap-2 md:gap-4">
						{faqs.map((item, index) => (
							<AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-[20px] px-5 md:px-8 border-none">
								<AccordionTrigger className="hover:no-underline py-3 md:py-4 h-full flex items-center">
									<span className="font-medium text-12 md:text-20 leading-106 tracking-neg-2 md:tracking-neg-1 text-black mr-4 text-left">
										{item.question}
									</span>
								</AccordionTrigger>
								<AccordionContent className="text-10! md:text-14! text-grey-primary pb-3 md:pb-4">{item.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</Container>
			</section>
		)
	);
};

export default Faq;
