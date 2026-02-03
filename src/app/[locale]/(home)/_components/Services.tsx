import { ServiceCard } from "@/entities/service-card";
import Container from "@/shared/ui/Container";

const servicesData = [
	{
		title: "Стратегический маркетинг",
		price: "15 000 000 сум",
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
	},
	{
		title: "Аналитика и исследования",
		price: "10 000 000 сум",
		duration: "1 мес. работы команды",
		description:
			"Проводим глубокую аналитику фармацевтического рынка, которая помогает принимать обоснованные стратегические и коммерческие решения.",
		features: [
			"Анализ рыночной конъюнктуры и конкурентной среды",
			"Исследования врачебных и потребительских инсайтов",
			"Оценка потенциала продуктов и терапевтических направлений",
			"Анализ эффективности текущих маркетинговых активностей",
		],
		backgroundImage: "/assets/images/homepage/service-bg-2.webp",
	},
	{
		title: "Вывод продуктов и обучение",
		price: "8 000 000 сум",
		duration: "2 мес. работы команды",
		description: "Помогаем успешно выводить фармацевтические продукты на рынок и повышаем экспертизу внутренних команд.",
		features: [
			"Разработка стратегии вывода нового продукта (launch strategy)",
			"Формирование ключевых сообщений и коммуникационной платформы",
			"Подготовка маркетинговых и коммерческих команд к запуску",
			"Проведение обучающих тренингов и стратегических сессий",
		],
		backgroundImage: "/assets/images/homepage/service-bg-3.webp",
	},
];

const Services = () => {
	return (
		<section className="pt-15 md:pt-30">
			<Container>
				<h2 className="text-black-primary text-[32px] md:text-[40px] font-bold text-center mb-8 md:mb-12">Услуги</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{servicesData.map((service, index) => (
						<ServiceCard key={index} {...service} />
					))}
				</div>
			</Container>
		</section>
	);
};

export default Services;
