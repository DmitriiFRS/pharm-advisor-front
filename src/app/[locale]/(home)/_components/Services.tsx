import BlackButton from "@/shared/ui/BlackButton";
import Container from "@/shared/ui/Container";
import Image from "next/image";

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

interface ServiceCardProps {
	title: string;
	price: string;
	duration: string;
	description: string;
	features: string[];
	backgroundImage: string;
	className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, duration, description, features, backgroundImage, className }) => {
	return (
		<div className={`flex flex-col bg-white rounded-[20px] overflow-hidden shadow-sm h-full border border-[#EBEBEB] ${className}`}>
			{/* Header with Background */}
			<div className="relative h-[220px] p-6 flex flex-col justify-between">
				<Image src={backgroundImage} alt={title} fill className="object-cover absolute inset-0 z-0" />
				{/* Overlay/Content */}
				<div className="relative z-10 h-full flex flex-col justify-between">
					<h3 className="text-white text-20 font-semibold leading-118">{title}</h3>
					<div className="flex items-end justify-between w-full">
						<span className="text-white text-20 font-bold leading-100">{price}</span>
						<div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-[6px]">
							<span className="text-[#858585] text-11 font-medium">{duration}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="p-6 flex flex-col grow">
				<p className="text-[#858585] text-[14px] leading-[140%] mb-6">{description}</p>

				<div className="mb-6">
					<h4 className="text-black-primary text-[14px] font-bold mb-3">В команде:</h4>
					<ul className="space-y-2.5">
						{features.map((feature, index) => (
							<li key={index} className="flex items-start gap-2.5">
								<Image
									src="/assets/icons/common/green-checked.svg"
									alt="check"
									width={16}
									height={16}
									className="mt-0.5 shrink-0"
								/>
								<span className="text-black-primary text-[13px] leading-130">{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-auto">
					<BlackButton />
				</div>
			</div>
		</div>
	);
};

export default Services;
