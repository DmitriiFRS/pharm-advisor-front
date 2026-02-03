"use client";

import { ServiceCard } from "@/entities/service-card/ui/ServiceCard";
import { useSearchParams } from "next/navigation";

interface Props {
	className?: string;
}

export const EducationList: React.FC<Props> = ({ className }) => {
	const searchParams = useSearchParams();
	const types = searchParams.getAll("type");
	const minPrice = Number(searchParams.get("minPrice"));
	const maxPrice = Number(searchParams.get("maxPrice"));

	// Mock Data
	const allServices = [
		{
			id: 1,
			title: "Стратегический маркетинг",
			price: "15 000 000 сум",
			priceValue: 15000,
			duration: "1мес. работы команды",
			description:
				"Разрабатываем комплексные маркетинговые стратегии для фармацевтических брендов на основе аналитики, рыночных данных и бизнес-целей компании.",
			features: [
				"Анализ рынка, конкурентов и целевых аудиторий",
				"Формирование позиционирования и ценностного предложения",
				"Разработка маркетинговой и коммуникационной стратегии",
				"Определение KPI и метрик эффективности",
			],
			backgroundImage: "/assets/images/homepage/service-bg-1.webp",
			type: "marketing",
		},
		{
			id: 2,
			title: "Управление продажами",
			price: "12 000 000 сум",
			priceValue: 12000,
			duration: "3 недели",
			description: "Оптимизация процессов продаж и обучение команды для повышения конверсии и роста выручки.",
			features: ["Аудит текущей системы продаж", "Разработка скриптов и стандартов", "Тренинги для менеджеров"],
			backgroundImage: "/assets/images/homepage/service-bg-1.webp",
			type: "sales",
		},
		{
			id: 3,
			title: "Эффективный менеджмент",
			price: "18 000 000 сум",
			priceValue: 18000,
			duration: "2 мес. сопровождения",
			description: "Построение эффективной системы управления для масштабирования бизнеса.",
			features: ["Описание бизнес-процессов", "Внедрение KPI", "Стратегические сессии"],
			backgroundImage: "/assets/images/homepage/service-bg-1.webp",
			type: "management",
		},
	];

	// Filter Logic
	const filteredServices = allServices.filter((service) => {
		const typeMatch = types.length === 0 || types.includes(service.type);
		const priceMatch = (!minPrice || service.priceValue >= minPrice) && (!maxPrice || service.priceValue <= maxPrice);
		return typeMatch && priceMatch;
	});

	if (filteredServices.length === 0) {
		return <div className="text-center py-10 text-gray-500 col-span-full">Ничего не найдено</div>;
	}

	return (
		<div className={`col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
			{filteredServices.map((service) => (
				<div key={service.id} className="min-h-[500px]">
					<ServiceCard
						title={service.title}
						price={service.price}
						duration={service.duration}
						description={service.description}
						features={service.features}
						backgroundImage={service.backgroundImage}
					/>
				</div>
			))}
		</div>
	);
};
