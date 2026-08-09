import Image from "next/image";

import type { Media, OutsourceSpeakerHighlight } from "@/features/outsource";
import { getMediaUrl } from "@/shared/lib/media";
import { sanitizeRichText } from "@/shared/lib/sanitizeRichText.server";
import Container from "@/shared/ui/Container";

interface OutsourceSpeakerProps {
	sectionTitle: string;
	speakerName: string;
	speakerRole: string;
	speakerHeadline: string;
	speakerDescription: string;
	speakerImage: Media | null;
	speakerHighlights: readonly OutsourceSpeakerHighlight[];
}

const OutsourceSpeaker = ({
	sectionTitle,
	speakerName,
	speakerRole,
	speakerHeadline,
	speakerDescription,
	speakerImage,
	speakerHighlights,
}: OutsourceSpeakerProps) => {
	const imageUrl = getMediaUrl(speakerImage?.url);
	const imageAlt = [speakerName, speakerRole].filter(Boolean).join(", ");
	const headlineHtml = sanitizeRichText(speakerHeadline);
	const descriptionHtml = sanitizeRichText(speakerDescription);

	return (
		<section
			className="bg-white pb-8 pt-8 lg:bg-[#f5f5f7] lg:pb-9 lg:pt-[clamp(80px,10vw,128px)]"
			aria-labelledby="outsource-speaker-title"
		>
			<Container>
				<h2
					id="outsource-speaker-title"
					className="text-center text-18 font-bold leading-none tracking-[-0.03em] lg:text-outsource-speaker-title max-h-[470px]"
				>
					{sectionTitle}
				</h2>

				<div
					className="mt-8 grid gap-5 overflow-hidden rounded-[18px] bg-[#c52f70] p-5 lg:mt-[clamp(32px,3vw,50px)] lg:min-h-[486px] lg:grid-cols-[31%_1fr] lg:p-1"
					style={{
						backgroundImage:
							"radial-gradient(circle at 78% 82%, rgba(244, 52, 139, 0.88) 0 20%, transparent 20.2%), radial-gradient(circle at 69% 111%, rgba(177, 44, 102, 0.48) 0 37%, transparent 37.2%), linear-gradient(110deg, #ad2d62 0%, #ef378c 100%)",
					}}
				>
					<figure className="relative aspect-[268/413] overflow-hidden rounded-[18px] bg-[#f2f2f2] lg:aspect-auto lg:min-h-full">
						{imageUrl && (
							<Image
								src={imageUrl}
								alt={imageAlt}
								fill
								sizes="(min-width: 1024px) 31vw, 100vw"
								className="object-cover lg:object-left"
							/>
						)}
						{imageUrl && imageAlt && <figcaption className="sr-only">{imageAlt}</figcaption>}
					</figure>

					<div className="flex min-w-0 flex-col lg:pb-[clamp(22px,2.5vw,40px)]">
						{speakerHighlights.length > 0 && (
							<div className="grid gap-5 lg:grid-cols-3">
								{speakerHighlights.map((highlight) => (
									<article
										key={highlight.id}
										className="flex min-h-[145px] flex-col items-center justify-center rounded-[18px] bg-white px-5 text-center lg:min-h-[170px] lg:px-6"
									>
										<h3 className="text-18! font-semibold leading-none tracking-[-0.025em] lg:whitespace-nowrap lg:text-outsource-highlight-title md:text-30!">
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
								className="max-w-[780px] text-18! md:text-20! font-medium leading-[1.2] tracking-[-0.02em] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3"
								dangerouslySetInnerHTML={{ __html: headlineHtml }}
							/>
							<div
								className="mt-7 text-14! leading-[1.5] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-white/50 [&_blockquote]:pl-4 [&_li+li]:mt-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 lg:leading-[1.3]"
								dangerouslySetInnerHTML={{ __html: descriptionHtml }}
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default OutsourceSpeaker;
