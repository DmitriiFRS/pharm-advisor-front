import Container from "@/shared/ui/Container";
import GrayLine from "@/shared/ui/GrayLine";
import React from "react";

interface AdvantageItem {
	id: number;
	number: string;
	title: string;
	description: string;
}

const advantagesData: AdvantageItem[] = [
	{
		id: 1,
		number: "50+",
		title: "проектов",
		description: "реализованных стратегий продвижения и вывода фармацевтических продуктов на рынок",
	},
	{
		id: 2,
		number: "10+",
		title: "лет опыта",
		description: "практической работы в сфере фармацевтического маркетинга, аналитики и стратегического консалтинга",
	},
	{
		id: 3,
		number: "20+",
		title: "брендов",
		description: "рецептурных и OTC-препаратов с разработанным позиционированием и маркетинговой стратегией",
	},
	{
		id: 4,
		number: "100+",
		title: "специалистов",
		description: "маркетинговых и коммерческих команд, прошедших обучение и стратегические сессии",
	},
];

const Advantages2 = () => {
	return (
		<section className="pt-10 md:pt-20">
			<Container className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
				{advantagesData.map((item) => (
					<AdvantageCard key={item.id} item={item} />
				))}
			</Container>
		</section>
	);
};

const AdvantageCard = ({ item }: { item: AdvantageItem }) => {
	return (
		<div className="flex flex-col">
			<div className="text-40 font-semibold leading-106 tracking-neg-3 text-black-secondary md:text-[56px]">{item.number}</div>
			<GrayLine className="my-5" />
			<div className="flex flex-col gap-2.5">
				<h3 className="text-15 font-semibold leading-106 tracking-neg-1 text-black-primary">{item.title}</h3>
				<p className="text-11 leading-118 tracking-neg-1 text-grey-primary">{item.description}</p>
			</div>
		</div>
	);
};

export default Advantages2;
