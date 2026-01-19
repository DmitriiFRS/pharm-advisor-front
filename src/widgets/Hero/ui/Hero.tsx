"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Hero = () => {
	// const t = useTranslations('Hero'); // Uncomment when translations are ready

	return (
		<section className="relative w-full overflow-hidden bg-background pt-20 pb-16 md:pt-32 md:pb-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col justify-center space-y-8"
					>
						<div className="space-y-4">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Pharm Advisor</h1>
							<p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
								Your trusted partner in pharmaceutical solutions. We provide cutting-edge tools and insights to help you succeed.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white dark:bg-white dark:text-black">
								Get Started
							</button>
							<button className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
								Learn More
							</button>
						</div>
					</motion.div>

					{/* Image Content */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
					>
						{/* Desktop Image */}
						<div className="hidden md:block relative aspect-[4/3] w-full overflow-hidden rounded-xl">
							<Image
								src="/assets/images/homepage/hero-desk.webp"
								alt="Pharm Advisor Hero Desktop"
								fill
								className="object-cover"
								priority
							/>
						</div>

						{/* Mobile Image */}
						<div className="block md:hidden relative aspect-[3/4] w-full overflow-hidden rounded-xl">
							<Image
								src="/assets/images/homepage/hero-mobile.webp"
								alt="Pharm Advisor Hero Mobile"
								fill
								className="object-cover"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
