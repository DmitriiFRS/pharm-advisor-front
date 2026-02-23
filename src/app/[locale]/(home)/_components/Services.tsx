"use client";

import { ServiceCard } from "@/entities/service-card";
import { ApplicationModal } from "@/features/feedback-form";
import Container from "@/shared/ui/Container";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Services = () => {
	const t = useTranslations("homepage.services");
	const [activeServiceTitle, setActiveServiceTitle] = useState("");

	const servicesData = [
		{
			title: t("items.strategy.title"),
			price: t("items.strategy.price"),
			duration: t("items.strategy.duration"),
			description: t("items.strategy.description"),
			features: [
				t("items.strategy.features.0"),
				t("items.strategy.features.1"),
				t("items.strategy.features.2"),
				t("items.strategy.features.3"),
			],
			backgroundImage: "/assets/images/homepage/service-bg-1.webp",
		},
		{
			title: t("items.analytics.title"),
			price: t("items.analytics.price"),
			duration: t("items.analytics.duration"),
			description: t("items.analytics.description"),
			features: [
				t("items.analytics.features.0"),
				t("items.analytics.features.1"),
				t("items.analytics.features.2"),
				t("items.analytics.features.3"),
			],
			backgroundImage: "/assets/images/homepage/service-bg-2.webp",
		},
		{
			title: t("items.launch.title"),
			price: t("items.launch.price"),
			duration: t("items.launch.duration"),
			description: t("items.launch.description"),
			features: [t("items.launch.features.0"), t("items.launch.features.1"), t("items.launch.features.2"), t("items.launch.features.3")],
			backgroundImage: "/assets/images/homepage/service-bg-3.webp",
		},
	];
	return (
		<section className="pt-15 md:pt-30">
			<Container>
				<h2 className="text-black-primary text-[32px] md:text-[40px] font-bold text-center mb-8 md:mb-12">{t("title")}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{servicesData.map((service, index) => (
						<ServiceCard key={index} {...service} onOpenClick={(title) => setActiveServiceTitle(title)} />
					))}
				</div>
			</Container>
			<ApplicationModal
				isOpen={!!activeServiceTitle}
				onClose={() => setActiveServiceTitle("")}
				siteSection={activeServiceTitle ? `Услуга на главной - ${activeServiceTitle}` : ""}
			/>
		</section>
	);
};

export default Services;
