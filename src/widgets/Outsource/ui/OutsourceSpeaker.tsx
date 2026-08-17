import type { OutsourceSpeaker as OutsourceSpeakerData } from "@/features/outsource";
import { sanitizeRichText } from "@/shared/lib/sanitizeRichText.server";

import OutsourceSpeakerSlider from "./OutsourceSpeakerSlider";

interface OutsourceSpeakerProps {
	sectionTitle: string;
	previousLabel: string;
	nextLabel: string;
	speakers: readonly OutsourceSpeakerData[];
}

const OutsourceSpeaker = ({ sectionTitle, previousLabel, nextLabel, speakers }: OutsourceSpeakerProps) => {
	if (speakers.length === 0) return null;

	const sanitizedSpeakers = speakers.map(({ headline, description, ...speaker }) => ({
		...speaker,
		headlineHtml: sanitizeRichText(headline),
		descriptionHtml: sanitizeRichText(description),
	}));

	return (
		<OutsourceSpeakerSlider
			sectionTitle={sectionTitle}
			previousLabel={previousLabel}
			nextLabel={nextLabel}
			speakers={sanitizedSpeakers}
		/>
	);
};

export default OutsourceSpeaker;
