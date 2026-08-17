"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import type { OutsourceSpeaker } from "@/features/outsource";
import { cn } from "@/lib/utils";
import { getMediaUrl } from "@/shared/lib/media";
import Container from "@/shared/ui/Container";

type SanitizedOutsourceSpeaker = Omit<OutsourceSpeaker, "headline" | "description"> & {
	headlineHtml: string;
	descriptionHtml: string;
};

interface OutsourceSpeakerSliderProps {
	sectionTitle: string;
	previousLabel: string;
	nextLabel: string;
	speakers: readonly SanitizedOutsourceSpeaker[];
}

const OutsourceSpeakerCard = ({ speaker }: { speaker: SanitizedOutsourceSpeaker }) => {
	const imageUrl = getMediaUrl(speaker.image?.url);
	const imageAlt = [speaker.name, speaker.role].filter(Boolean).join(", ");

	return (
		<div
			className="grid gap-5 overflow-hidden rounded-[18px] bg-[#c52f70] p-5 lg:min-h-[486px] lg:grid-cols-[31%_1fr] lg:p-1"
			style={{
				backgroundImage:
					"radial-gradient(circle at 78% 82%, rgba(244, 52, 139, 0.88) 0 20%, transparent 20.2%), radial-gradient(circle at 69% 111%, rgba(177, 44, 102, 0.48) 0 37%, transparent 37.2%), linear-gradient(110deg, #ad2d62 0%, #ef378c 100%)",
			}}
		>
			<figure className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#f2f2f2] md:aspect-[16/10] lg:aspect-auto lg:min-h-full">
				{imageUrl && (
					<Image
						src={imageUrl}
						alt={imageAlt}
						fill
						sizes="(min-width: 1024px) 31vw, 100vw"
						className="object-cover object-left-top lg:object-left"
					/>
				)}
				{imageUrl && imageAlt && <figcaption className="sr-only">{imageAlt}</figcaption>}
			</figure>

			<div className="flex min-w-0 flex-col lg:pb-[clamp(22px,2.5vw,40px)]">
				{speaker.highlights.length > 0 && (
					<div className="grid gap-5 lg:grid-cols-3">
						{speaker.highlights.map((highlight) => (
							<article
								key={highlight.id}
								className="flex min-h-[145px] flex-col items-center justify-center rounded-[18px] bg-white px-5 text-center lg:min-h-[170px] lg:px-6"
							>
								<h3 className="text-18! font-semibold leading-none tracking-[-0.025em] md:text-30! lg:whitespace-nowrap lg:text-outsource-highlight-title">
									{highlight.title}
								</h3>
								<p className="mt-4 max-w-[260px] text-12! leading-[1.25] text-[#858585] lg:mt-6 lg:text-outsource-highlight-description">
									{highlight.description}
								</p>
							</article>
						))}
					</div>
				)}

				<div className="mt-11 max-w-[900px] min-w-0 break-words text-white lg:mt-10 lg:pr-7">
					<div
						className="max-w-[780px] text-18! font-medium leading-[1.2] tracking-[-0.02em] md:text-20! [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3"
						dangerouslySetInnerHTML={{ __html: speaker.headlineHtml }}
					/>
					<div
						className="mt-7 text-14! leading-[1.5] lg:leading-[1.3] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-white/50 [&_blockquote]:pl-4 [&_li+li]:mt-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
						dangerouslySetInnerHTML={{ __html: speaker.descriptionHtml }}
					/>
				</div>
			</div>
		</div>
	);
};

const OutsourceSpeakerSlider = ({ sectionTitle, previousLabel, nextLabel, speakers }: OutsourceSpeakerSliderProps) => {
	const swiperRef = useRef<SwiperInstance | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const reduceMotion = useReducedMotion();
	const hasControls = speakers.length > 1;

	if (speakers.length === 0) return null;

	return (
		<section
			className="bg-white pb-8 pt-8 lg:bg-[#f5f5f7] lg:pb-9 lg:pt-[clamp(80px,10vw,128px)]"
			aria-labelledby="outsource-speaker-title"
		>
			<Container>
				<h2
					id="outsource-speaker-title"
					className="max-h-[470px] text-center text-18 font-bold leading-none tracking-[-0.03em] lg:text-outsource-speaker-title"
				>
					{sectionTitle}
				</h2>

				<Swiper
					modules={[A11y, Keyboard]}
					a11y={{
						enabled: true,
						containerMessage: sectionTitle,
						slideLabelMessage: "{{index}} / {{slidesLength}}",
					}}
					autoHeight
					keyboard={{ enabled: hasControls, onlyInViewport: true }}
					speed={reduceMotion ? 0 : 450}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						setActiveIndex(swiper.activeIndex);
					}}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className="mt-8 w-full lg:mt-[clamp(32px,3vw,50px)]"
				>
					{speakers.map((speaker) => (
						<SwiperSlide key={speaker.id} className="h-auto!">
							<OutsourceSpeakerCard speaker={speaker} />
						</SwiperSlide>
					))}
				</Swiper>

				{hasControls && (
					<div className="mt-6 flex items-center justify-center gap-5 lg:mt-8">
						<button
							type="button"
							onClick={() => swiperRef.current?.slidePrev()}
							disabled={activeIndex === 0}
							aria-label={previousLabel}
							className="flex size-11 items-center justify-center rounded-full border border-[#d7d7d7] bg-white text-[#575656] transition-colors hover:border-[#c52f70] hover:text-[#c52f70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c52f70] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-35"
						>
							<ChevronLeft aria-hidden="true" className="size-5" strokeWidth={2.2} />
						</button>

						<div className="flex items-center gap-2" aria-label={sectionTitle}>
							{speakers.map((speaker, index) => {
								const isActive = index === activeIndex;

								return (
									<button
										key={speaker.id}
										type="button"
										onClick={() => swiperRef.current?.slideTo(index)}
										aria-label={`${sectionTitle}: ${speaker.name || index + 1}`}
										aria-current={isActive ? "true" : undefined}
										className={cn(
											"size-2.5 rounded-full transition-[background-color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c52f70] active:scale-[0.9]",
											isActive ? "scale-110 bg-[#c52f70]" : "bg-[#c7c7c7] hover:bg-[#a9a9a9]"
										)}
									/>
								);
							})}
						</div>

						<button
							type="button"
							onClick={() => swiperRef.current?.slideNext()}
							disabled={activeIndex === speakers.length - 1}
							aria-label={nextLabel}
							className="flex size-11 items-center justify-center rounded-full border border-[#d7d7d7] bg-white text-[#575656] transition-colors hover:border-[#c52f70] hover:text-[#c52f70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c52f70] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-35"
						>
							<ChevronRight aria-hidden="true" className="size-5" strokeWidth={2.2} />
						</button>
					</div>
				)}
			</Container>
		</section>
	);
};

export default OutsourceSpeakerSlider;
