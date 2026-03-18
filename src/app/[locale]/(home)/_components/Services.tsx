"use client";

import { ServiceCard } from "@/entities/service-card";
import { ApplicationModal } from "@/features/feedback-form";
import Container from "@/shared/ui/Container";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useServices } from "@/features/services";

const Services = () => {
	const t = useTranslations("homepage.services");
	const { services } = useServices();
	const [activeServiceTitle, setActiveServiceTitle] = useState("");

	useEffect(() => {
		console.log(services);
	}, [services]);

	return (
		services.length > 0 && (
			<section className="pt-15 md:pt-30">
				<Container>
					<h2 className="text-black-primary text-[32px] md:text-[40px] font-bold text-center mb-8 md:mb-12">{t("title")}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{services.map((service, index) => (
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
		)
	);
};

export default Services;
