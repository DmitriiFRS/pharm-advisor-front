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
		<section className="py-10 md:py-20">
			<Container>
				<div className="relative bg-primary-gradient rounded-[20px] md:rounded-[40px] overflow-visible text-white p-6 md:p-12 lg:p-[60px] flex flex-col lg:flex-row items-center justify-between min-h-[500px]">
					{/* Background Pattern */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[20px] md:rounded-[40px] z-0 pointer-events-none">
						<Image src="/assets/icons/homepage/bg-picture.svg" alt="background pattern" fill className="object-cover opacity-50" />
					</div>

					{/* Content */}
					<div className="relative z-10 w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 mb-10 lg:mb-0">
						<h2 className="text-[28px] md:text-[40px] lg:text-[46px] font-bold leading-[106%] tracking-[-0.02em]">
							Обучающие курсы для фармацевтических команд
						</h2>
						<p className="text-[16px] md:text-[18px] leading-[130%] opacity-90 max-w-[500px]">
							Практические образовательные программы по фарммаркетингу, аналитике и стратегическому управлению продуктами,
							разработанные на основе реального опыта и рыночных кейсов.
						</p>
						<div className="w-full sm:w-fit">
							<BlackButton className="w-full sm:w-auto px-8">
								<span className="mr-2">Узнать подробнее</span>
								<ChevronRight size={20} />
							</BlackButton>
						</div>
					</div>

					{/* Laptop Image */}
					<div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end">
						<div className="relative w-full max-w-[600px] aspect-[600/450]">
							<Image src="/assets/images/homepage/laptop.webp" alt="Courses on laptop" fill className="object-contain" />
						</div>
					</div>
				</div>

				{/* Advantages Columns */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 md:-mt-16 relative z-20 px-0 md:px-10">
					{COURSES_ADVANTAGES.map((item) => (
						<div key={item.id} className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col gap-4 min-h-[180px]">
							<div className="w-12 h-12 relative">
								<Image src={item.icon} alt="icon" width={48} height={48} />
							</div>
							<p className="text-black-primary text-[16px] md:text-[18px] font-medium leading-[130%]">{item.title}</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};

export default Courses;
