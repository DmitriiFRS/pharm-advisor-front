"use client";

import { useState } from "react";
import Image from "next/image";
import banner from "@/assets/images/homepage/hero-desk.webp";
import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import arrowRight from "@/assets/icons/common/arrow-right.svg";
import { ApplicationModal } from "@/features/feedback-form";

const HeroSection = () => {
	const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

	return (
		<section className="">
			<div>
				<Image src={banner} alt="banner" className="absolute left-0 top-0 object-cover w-screen h-full max-h-screen" priority />
			</div>
			<Container className="h-full text-white">
				<div className="relative z-10 h-screen flex flex-col justify-end pb-[106px]">
					<div>
						<h1 className="text-40 font-bold max-w-[500px] leading-100">Консалтинговая фарм компания в Узбекистане</h1>
						<p className="mt-[15px] max-w-[420px] text-14 leading-130">
							Стратегический консалтинг для фармкомпаний: обучение команд, стратегия go-to-market, оптимизация портфеля и
							маркетинговые решения, основанные на аналитике и практике рынка.
						</p>
					</div>
					<PrimaryButton onClick={() => setIsApplicationModalOpen(true)} className="mt-5 flex items-center justify-center gap-2">
						<span>Оставить заявку</span>
						<Image src={arrowRight} alt="arrow-right" width={15} height={15} />
					</PrimaryButton>
				</div>
			</Container>

			<ApplicationModal isOpen={isApplicationModalOpen} onClose={setIsApplicationModalOpen} />
		</section>
	);
};

export default HeroSection;
