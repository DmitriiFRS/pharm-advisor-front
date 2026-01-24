import sample from "@/assets/images/homepage/about-homepage.webp";
import Container from "@/shared/ui/Container";
import Image from "next/image";

const About = () => {
	return (
		<section className="pt-15 md:pt-25">
			<Container className="md:flex md:gap-10 lg:gap-20">
				<div className="w-full h-auto aspect-square rounded-[14px] md:aspect-528/327">
					<Image src={sample} alt="sample" width={528} height={276} className="w-full h-full object-cover rounded-[14px]" />
				</div>
				<div className="flex flex-col mt-10">
					<span className="text-grey-primary text-11 leading-118 font-medium tracking-neg-2">[ О компании ]</span>
					<h2 className="text-black-primary text-18 leading-106 font-semibold tracking-neg-1 mt-2.5">
						Мы — консалтинговая компания, специализирующаяся на стратегическом маркетинге и аналитике для фармацевтических компаний.
					</h2>
					<div className="flex flex-col gap-4 text-grey-primary text-11 leading-118 font-medium tracking-neg-2 mt-5">
						<p>
							Помогаем брендам выстраивать системный маркетинг, принимать решения на основе данных и эффективно выводить продукты на
							рынок.
						</p>
						<p>
							Наша работа не заканчивается презентацией: мы формируем понятный план действий, сопровождаем команды на этапе внедрения
							и измеряем эффект через KPI — продажи, долю рынка и эффективность инвестиций.
						</p>
						<p>
							Фокус — стратегия, аналитика, продуктовый портфель и go-to-market решения, которые дают практический результат и
							становятся основой устойчивого роста.
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default About;
