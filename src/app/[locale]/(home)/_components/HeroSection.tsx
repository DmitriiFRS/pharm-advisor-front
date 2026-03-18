"use client";

import { useState } from "react";
import Image from "next/image";
import banner from "@/assets/images/homepage/hero-desk.webp";
import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import arrowRight from "@/assets/icons/common/arrow-right.svg";
import { ApplicationModal } from "@/features/feedback-form";

import { useTranslations } from "next-intl";

const HeroSection = () => {
	const t = useTranslations("homepage.hero");
	const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

	return (
		<section className="">
			<div>
				<Image
					src={banner}
					alt="banner"
					width={1920}
					height={1080}
					className="absolute left-0 top-0 object-cover w-screen h-screen max-h-screen"
					priority
				/>
			</div>
			<Container className="h-full text-white">
				<div className="relative z-10 h-screen max-h-full flex flex-col justify-end pb-[106px]">
					<div>
						<div>
							<h1 className="text-40 font-bold max-w-[500px] leading-100">{t("title")}</h1>
							<p className="mt-[15px] max-w-[420px] text-14 leading-130">{t("description")}</p>
						</div>
						<PrimaryButton onClick={() => setIsApplicationModalOpen(true)} className="mt-5 flex items-center justify-center gap-2">
							<span>{t("button")}</span>
							<Image src={arrowRight} alt="arrow-right" width={15} height={15} className="relative top-px" />
						</PrimaryButton>
					</div>
				</div>
			</Container>

			<ApplicationModal
				isOpen={isApplicationModalOpen}
				onClose={setIsApplicationModalOpen}
				siteSection="Первый блок на главной странице"
			/>
		</section>
	);
};

export default HeroSection;
