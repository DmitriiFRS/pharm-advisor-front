"use client";

import Container from "@/shared/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const images = [
	"/assets/images/homepage/carousel-1.webp",
	"/assets/images/homepage/carousel-2.webp",
	"/assets/images/homepage/carousel-3.webp",
	"/assets/images/homepage/carousel-4.webp",
	"/assets/images/homepage/carousel-5.webp",
];

const Carousel = () => {
	return (
		<section className="overflow-hidden pt-12.5 md:pt-10">
			<Container>
				<div className="flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
					<motion.div
						className="flex shrink-0 gap-10 pr-10"
						animate={{
							x: ["0%", "-100%"],
						}}
						transition={{
							duration: 20,
							ease: "linear",
							repeat: Infinity,
						}}
					>
						{images.map((src, index) => (
							<div
								key={`original-${index}`}
								className="flex h-[120px] w-[200px] items-center justify-center rounded-[20px] bg-white"
							>
								<div className="relative h-[80px] w-[160px]">
									<Image src={src} alt={`Partner ${index + 1}`} fill className="object-contain" />
								</div>
							</div>
						))}
					</motion.div>
					<motion.div
						className="flex shrink-0 gap-10 pr-10"
						animate={{
							x: ["0%", "-100%"],
						}}
						transition={{
							duration: 20,
							ease: "linear",
							repeat: Infinity,
						}}
					>
						{images.map((src, index) => (
							<div
								key={`duplicate-${index}`}
								className="flex h-[120px] w-[200px] items-center justify-center rounded-[20px] bg-white"
							>
								<div className="relative h-[80px] w-[160px]">
									<Image src={src} alt={`Partner ${index + 1}`} fill className="object-contain" />
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</Container>
		</section>
	);
};

export default Carousel;
