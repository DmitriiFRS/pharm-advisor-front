import Container from "@/shared/ui/Container";
import BlackButton from "@/shared/ui/BlackButton";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const COURSES_ADVANTAGES = [
	{
		id: 1,
		icon: "/assets/icons/homepage/advantage-1.svg",
		title: "Практика и кейсы — реальные примеры из фармацевтического бизнеса.",
	},
	{
		id: 2,
		icon: "/assets/icons/homepage/advantage-2.svg",
		title: "Эксперты отрасли — обучение от практиков фарммаркетинга и консалтинга.",
	},
	{
		id: 3,
		icon: "/assets/icons/homepage/advantage-3.svg",
		title: "Системный подход — структурированные знания от аналитики до стратегии.",
	},
];

const Courses = () => {
	return (
		<section className="pt-10 md:pt-30">
			<Container>
				<div className="relative bg-primary-gradient rounded-[20px] overflow-visible text-white pb-25 sm:pb-5 pt-7.5 px-2.5 sm:px-7.5 md:pb-35 lg:p-[60px] flex flex-col sm:flex-row items-center justify-between min-h-[500px] sm:min-h-50 md:gap-10 md:items-start">
					{/* Background Pattern */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[20px] z-0 pointer-events-none">
						<Image src="/assets/icons/homepage/bg-picture.svg" alt="background pattern" fill className="object-cover opacity-50" />
					</div>

					{/* Content */}
					<div className="relative z-10 w-full lg:w-1/2 md:gap-8 mb-10 lg:mb-0">
						<h2 className="text-20 font-semibold leading-100 tracking-neg-3 md:text-40">
							Обучающие курсы для фармацевтических команд
						</h2>
						<p className="text-14 leading-130 tracking-neg-2 mt-5">
							Практические курсы для медпредставителей, региональных менеджеров и маркетинга: структура визита, управление полевой
							командой, ключевые сообщения и промо-планирование. Реальные кейсы, инструменты и результаты, которые можно внедрить
							сразу.
						</p>
						<div className="w-full sm:w-full sm:max-w-[330px] mt-10">
							<BlackButton className="w-full">
								<span className="mr-2">Узнать подробнее</span>
								<ChevronRight size={20} />
							</BlackButton>
						</div>
					</div>

					{/* Laptop Image */}
					<div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end">
						<div className="relative w-full aspect-388/280 md:aspect-497/359 md:w-[359px] md:h-[497px]">
							<Image src="/assets/images/homepage/laptop.webp" alt="Courses on laptop" fill className="object-contain" />
						</div>
					</div>
				</div>

				{/* Advantages Columns */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-15 sm:-mt-10 relative z-20 px-0 md:px-0 md:gap-3">
					{COURSES_ADVANTAGES.map((item) => (
						<div key={item.id} className="bg-white rounded-[18px] p-5 shadow-sm min-h-[180px]">
							<div className="w-12 h-12 relative">
								<Image src={item.icon} alt="icon" width={48} height={48} className="rounded-[12px]" />
							</div>
							<p className="text-black-primary text-16 font-semibold tracking-neg-2 leading-118 mt-6">{item.title}</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};

export default Courses;
