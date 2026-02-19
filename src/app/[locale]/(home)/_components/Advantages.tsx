"use client";

import advantage_1 from "@/assets/icons/homepage/advantage-1.svg";
import advantage_2 from "@/assets/icons/homepage/advantage-2.svg";
import advantage_3 from "@/assets/icons/homepage/advantage-3.svg";
import Container from "@/shared/ui/Container";
import Image from "next/image";

import { useScroll } from "@/shared/lib/context/ScrollContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useTranslations } from "next-intl";

const Advantages = () => {
	const t = useTranslations("homepage.advantages");
	const { advantagesRef, scrollToAdvantages } = useScroll();
	const searchParams = useSearchParams();

	useEffect(() => {
		const section = searchParams.get("section");
		if (section === "advantages") {
			setTimeout(() => {
				scrollToAdvantages();
			}, 100);
		}
	}, [searchParams, scrollToAdvantages]);

	return (
		<section className="pt-15 md:pt-10" ref={advantagesRef}>
			<Container>
				<div className="flex flex-col md:flex-row md:gap-2.5 lg:border-y lg:border-[#e5e5e5]">
					<AdvantageItem title={t("item1.title")} description={t("item1.description")} icon={advantage_1} />
					<AdvantageItem title={t("item2.title")} description={t("item2.description")} icon={advantage_2} />
					<AdvantageItem title={t("item3.title")} description={t("item3.description")} icon={advantage_3} isLast />
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
				<p className="text-center text-grey-primary text-14 leading-118 tracking-neg-2 font-medium">{description}</p>
			</div>
		</div>
	);
};

export default Advantages;
