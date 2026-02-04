import Image from "next/image";
import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { ChevronRight } from "lucide-react";

const items = [
	{
		image: "/assets/images/homepage/knowledge-col-1.webp",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
	},
	{
		image: "/assets/images/homepage/knowledge-col-2.webp",
		title: "Как вывести фармпрепарат на рынок в Ташкенте: аналитический обзор и практические рекомендации",
	},
	{
		image: "/assets/images/homepage/knowledge-col-3.webp",
		title: "Аналитика фармрынка Узбекистана: что влияет на рост брендов и продаж сегодня",
	},
];

const KnowledgeBase = () => {
	return (
		<section className="pt-15 md:pt-30">
			<Container>
				<h2 className="text-26 md:text-39 font-bold text-center text-black-primary leading-100">База знаний</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 md:mt-10 md:gap-3">
					{items.map((item, index) => (
						<div key={index} className="flex flex-col group cursor-pointer">
							<div className="relative w-full aspect-square rounded-[20px] overflow-hidden">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<p className="mt-5 text-16 font-medium text-black-primary leading-130 tracking-neg-1">{item.title}</p>
						</div>
					))}
				</div>
				<div className="mt-10 flex justify-center">
					<PrimaryButton href="/knowledge-base" className="text-white flex items-center justify-center">
						<span className="mr-2">Смотреть все</span>
						<ChevronRight size={15} />
					</PrimaryButton>
				</div>
			</Container>
		</section>
	);
};

export default KnowledgeBase;
