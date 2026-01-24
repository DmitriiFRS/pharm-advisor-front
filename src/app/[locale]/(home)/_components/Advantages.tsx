import advantage_1 from "@/assets/icons/homepage/advantage-1.svg";
import advantage_2 from "@/assets/icons/homepage/advantage-2.svg";
import advantage_3 from "@/assets/icons/homepage/advantage-3.svg";
import Container from "@/shared/ui/Container";
import Image from "next/image";

const Advantages = () => {
	return (
		<section className="pt-15 md:pt-10">
			<Container>
				<div className="flex flex-col md:flex-row md:gap-2.5 lg:border-y lg:border-[#e5e5e5]">
					<AdvantageItem
						title="Глубокая экспертиза в фарммаркетинге"
						description="мы понимаем специфику фармацевтического рынка 
и говорим с клиентами на одном профессиональном языке."
						icon={advantage_1}
					/>
					<AdvantageItem
						title="Стратегия на основе аналитики"
						description="рекомендации строятся на данных, исследованиях и реальных рыночных показателях, а не на предположениях."
						icon={advantage_2}
					/>
					<AdvantageItem
						title="Чистый консалтинг без операционной нагрузки"
						description="Берём ответственность за результат: от аналитики и выбора приоритетов до поддержки команды в реализации."
						icon={advantage_3}
						isLast
					/>
				</div>
			</Container>
		</section>
	);
};

const AdvantageItem = ({ title, description, icon, isLast }: { title: string; description: string; icon: string; isLast?: boolean }) => {
	return (
		<div className="flex-1 py-5">
			<div
				className={`h-full py-[25px] flex flex-col items-center gap-2.5 border-t border-[#e5e5e5] lg:border-y-0 lg:py-0 lg:border-r ${
					isLast ? "border-b lg:border-r-0" : ""
				} lg:border-b-0 lg:px-5`}
			>
				<Image src={icon} alt="icon" width={50} height={50} className="rounded-xl" />
				<h3 className="leading-93 tracking-neg-1 text-center font-semibold flex-1">{title}</h3>
				<p className="text-center text-grey-primary text-11 leading-118 tracking-neg-2 font-medium">{description}</p>
			</div>
		</div>
	);
};

export default Advantages;
