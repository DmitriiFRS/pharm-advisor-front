import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Container from "@/shared/ui/Container";

import type { FaqItem } from "../types/faq.types";

interface FaqProps {
	title: string;
	items: readonly FaqItem[];
	className?: string;
}

const Faq = ({ title, items, className }: FaqProps) => {
	if (items.length === 0) return null;

	return (
		<section className={cn("py-15 md:py-30", className)}>
			<Container>
				<h2 className="mb-8 text-center text-20 font-semibold leading-100 tracking-neg-3 text-black md:mb-15 md:text-40 md:tracking-neg-2">
					{title}
				</h2>
				<Accordion type="single" collapsible className="flex flex-col gap-2 md:gap-4">
					{items.map((item) => (
						<AccordionItem key={item.id} value={`item-${item.id}`} className="rounded-[20px] border-none bg-white px-5 md:px-8">
							<AccordionTrigger className="flex h-full items-center py-3 hover:no-underline md:py-4">
								<span className="mr-4 text-left text-12 font-medium leading-106 tracking-neg-2 text-black md:text-20 md:tracking-neg-1">
									{item.question}
								</span>
							</AccordionTrigger>
							<AccordionContent className="pb-3 text-10! text-grey-primary md:pb-4 md:text-14!">{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Container>
		</section>
	);
};

export default Faq;
