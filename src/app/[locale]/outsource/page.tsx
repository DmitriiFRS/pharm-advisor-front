import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
	formatOutsourceStart,
	getOutsourceFaqs,
	getOutsourcePage,
	sortOutsourceContent,
	type OutsourceFaqResponse,
} from "@/features/outsource";
import { ApiServerError } from "@/shared/api/base.server";
import NotFoundContent from "@/shared/ui/NotFoundContent";
import { OutsourceFaq, OutsourceHero, OutsourceProgram, OutsourceSpeaker } from "@/widgets/Outsource";
import { ContactSection } from "@/widgets/ContactSection";

interface OutsourcePageProps {
	params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: OutsourcePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "outsource.metadata" });

	return {
		title: t("title"),
		description: t("description"),
		openGraph: {
			title: t("title"),
			description: t("description"),
			locale: locale === "uz" ? "uz_UZ" : "ru_RU",
			type: "website",
		},
		alternates: {
			languages: {
				ru: "/outsource",
				uz: "/uz/outsource",
			},
		},
	};
}

export default async function OutsourcePage({ params }: OutsourcePageProps) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "outsource" });
	const [pageResult, faqResult] = await Promise.allSettled([getOutsourcePage(locale), getOutsourceFaqs(locale)]);

	if (pageResult.status === "rejected") {
		if (pageResult.reason instanceof ApiServerError && pageResult.reason.status === 404) notFound();
		throw pageResult.reason;
	}

	if (!pageResult.value.data) notFound();

	let faqResponse: OutsourceFaqResponse = { data: [], meta: null };
	if (faqResult.status === "fulfilled") {
		faqResponse = faqResult.value;
	} else if (!(faqResult.reason instanceof ApiServerError && faqResult.reason.status === 404)) {
		throw faqResult.reason;
	}

	const outsource = sortOutsourceContent(pageResult.value.data);
	const hasPrimaryContent = [outsource.heroTitle, outsource.programTitle, outsource.speakerName].some((value) => value.trim().length > 0);

	if (!hasPrimaryContent) {
		return (
			<div className="min-h-[60dvh] bg-[#f5f5f7] pt-24">
				<NotFoundContent>{t("states.empty")}</NotFoundContent>
			</div>
		);
	}

	return (
		<div className="bg-[#f5f5f7] text-[#111111]">
			<OutsourceHero
				heroTitle={outsource.heroTitle}
				startsAt={formatOutsourceStart(outsource.startsAt, locale)}
				heroCards={outsource.heroCards}
			/>
			<OutsourceProgram
				programTitle={outsource.programTitle}
				programImage={outsource.programImage}
				programItems={outsource.programItems}
				emptyLabel={t("states.programEmpty")}
			/>
			<OutsourceSpeaker
				sectionTitle={t("speaker.sectionTitle")}
				speakerName={outsource.speakerName}
				speakerRole={outsource.speakerRole}
				speakerHeadline={outsource.speakerHeadline}
				speakerDescription={outsource.speakerDescription}
				speakerImage={outsource.speakerImage}
				speakerHighlights={outsource.speakerHighlights}
			/>
			<OutsourceFaq title={t("faq.title")} items={faqResponse.data} />
			<ContactSection />
		</div>
	);
}
