"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import { useTranslations } from "next-intl";

import heroImage from "@/assets/images/outsource/pharm-hero.webp";
import { ApplicationModal } from "@/features/feedback-form";
import type { FormattedOutsourceStart, OutsourceHeroCard } from "@/features/outsource";
import { cn } from "@/lib/utils";
import { getMediaUrl } from "@/shared/lib/media";
import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";

interface OutsourceHeroProps {
	heroTitle: string;
	startsAt: FormattedOutsourceStart | null;
	heroCards: readonly OutsourceHeroCard[];
}

const HERO_ACCENT_TEXT = "Фарма и E-Commerce,";

const OutsourceHero = ({ heroTitle, startsAt, heroCards }: OutsourceHeroProps) => {
	const t = useTranslations("outsource.hero");
	const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
	const accentStartIndex = heroTitle.indexOf(HERO_ACCENT_TEXT);
	const hasAccentText = accentStartIndex !== -1;
	const titleBeforeAccent = hasAccentText ? heroTitle.slice(0, accentStartIndex) : heroTitle;
	const titleAfterAccent = hasAccentText ? heroTitle.slice(accentStartIndex + HERO_ACCENT_TEXT.length) : "";

	return (
		<section className="relative isolate min-h-[900px] overflow-hidden md:min-h-[100dvh]" aria-labelledby="outsource-title">
			<Image src={heroImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[34%_center] md:object-center" />

			<Container>
				<div className="pt-[182px] md:pt-[clamp(180px,20vh,210px)]">
					<div className="max-w-[590px]">
						{startsAt && (
							<div className="inline-flex h-[43px] w-full max-w-[377px] items-center justify-between rounded-[13px] bg-[linear-gradient(100deg,#ad2d62_0%,#ef378c_100%)] px-5 text-white shadow-[0_12px_32px_rgba(184,45,103,0.12)] md:h-[61px] md:w-auto md:max-w-none md:justify-start md:gap-10 md:px-7">
								<div className="flex items-center gap-3 whitespace-nowrap text-17 font-semibold leading-160 tracking-neg-2 md:gap-4 md:text-25">
									<CalendarDays aria-hidden="true" className="size-6 shrink-0 md:size-7" strokeWidth={2.4} />
									<time dateTime={startsAt.iso}>{startsAt.date}</time>
								</div>
								<div className="flex items-center gap-3 whitespace-nowrap text-17 font-semibold leading-160 tracking-neg-2 md:gap-4 md:text-25">
									<Clock3 aria-hidden="true" className="size-6 shrink-0 fill-white md:size-7" strokeWidth={2.4} />
									<time dateTime={startsAt.iso}>{startsAt.time}</time>
								</div>
							</div>
						)}

						<h1
							id="outsource-title"
							className={cn(
								"whitespace-pre-line text-24! font-semibold leading-110 tracking-neg-3 text-[#575656] md:text-40 md:leading-100 md:tracking-neg-2",
								startsAt ? "mt-5 md:mt-[30px]" : "mt-0"
							)}
						>
							{titleBeforeAccent}
							{hasAccentText && <span className="text-[#e94190]">{HERO_ACCENT_TEXT}</span>}
							{titleAfterAccent}
						</h1>

						{heroCards.length > 0 && (
							<div className="mt-5 grid w-full grid-cols-2 gap-x-4 gap-y-7 md:mt-10 sm:max-w-[540px] sm:gap-x-14 sm:gap-y-10">
								{heroCards.map((card) => {
									const iconUrl = getMediaUrl(card.icon?.url);

									return (
										<article key={card.id}>
											{iconUrl && (
												<div className="relative flex size-[50px] items-center justify-center overflow-hidden rounded-[12px] bg-[#eb3c88] sm:size-[68px]">
													<Image src={iconUrl} alt="" fill sizes="50px" className="object-contain p-1" />
												</div>
											)}
											<h2 className={cn("text-14 font-semibold leading-93 tracking-neg-1", iconUrl ? "mt-7 sm:mt-6" : "mt-0")}>
												{card.title}
											</h2>
											<p className="mt-2 pr-2 text-11 font-medium leading-118 tracking-neg-2 text-[#575656] sm:max-w-[220px] sm:pr-0">
												{card.subtitle}
											</p>
										</article>
									);
								})}
							</div>
						)}

						<PrimaryButton onClick={() => setIsApplicationModalOpen(true)} className="mt-[60px] text-12! md:mt-10">
							{t("register")}
							<ChevronRight aria-hidden="true" className="size-4" strokeWidth={2.2} />
						</PrimaryButton>
					</div>
				</div>
			</Container>

			<ApplicationModal isOpen={isApplicationModalOpen} onClose={setIsApplicationModalOpen} siteSection={t("formSection")} />
		</section>
	);
};

export default OutsourceHero;
