"use client";

import Image from "next/image";
import banner from "@/assets/images/homepage/hero-desk.webp";
import logo from "@/assets/images/common/wip-logo.webp";
import Container from "@/shared/ui/Container";

export const WipPage = () => {
	return (
		<main className="relative h-screen max-w-screen w-full">
			<Image src={banner} alt="Background" className="absolute left-0 top-0 h-full w-full object-cover" priority />
			<Container className="relative z-10 flex h-full flex-col items-center justify-center gap-8 text-center text-white">
				<Image src={logo} alt="Pharm Advisor" width={400} height={130} className="h-auto w-[250px] md:w-[400px]" priority />
				<h1 className="text-30 md:text-40 font-bold leading-100">Страница еще в разработке</h1>
			</Container>
		</main>
	);
};
