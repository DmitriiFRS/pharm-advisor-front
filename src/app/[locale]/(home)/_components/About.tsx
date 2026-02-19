import sample from "@/assets/images/homepage/about-homepage.webp";
import Container from "@/shared/ui/Container";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

const About = async () => {
	const t = await getTranslations("homepage.about");
	return (
		<section className="pt-15 md:pt-25">
			<Container className="md:flex md:gap-10 lg:gap-20">
				<div className="w-full h-auto aspect-square rounded-[14px] md:aspect-528/327">
					<Image src={sample} alt="sample" width={528} height={276} className="w-full h-full object-cover rounded-[14px]" />
				</div>
				<div className="flex flex-col mt-10">
					<span className="text-grey-primary text-14 leading-118 font-medium tracking-neg-2">{t("label")}</span>
					<h2 className="text-black-primary text-18 leading-106 font-semibold tracking-neg-1 mt-2.5">{t("title")}</h2>
					<div className="flex flex-col gap-4 text-grey-primary text-14 leading-118 font-medium tracking-neg-2 mt-5">
						<p className="text-14">{t("paragraph1")}</p>
						<p>{t("paragraph2")}</p>
						<p>{t("paragraph3")}</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default About;
