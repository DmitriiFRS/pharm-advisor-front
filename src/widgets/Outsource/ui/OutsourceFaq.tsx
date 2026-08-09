import type { OutsourceFaqItem } from "@/features/outsource";
import { Faq } from "@/features/faq";

interface OutsourceFaqProps {
	title: string;
	items: readonly OutsourceFaqItem[];
}

const OutsourceFaq = ({ title, items }: OutsourceFaqProps) => <Faq title={title} items={items} />;

export default OutsourceFaq;
