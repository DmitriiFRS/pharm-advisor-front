import type { OutsourcePageData } from "../types/outsource.types";

const byOrderAndId = <T extends { id: number; order: number }>(first: T, second: T) => first.order - second.order || first.id - second.id;

export const sortOutsourceContent = (data: OutsourcePageData): OutsourcePageData => ({
	...data,
	heroCards: [...data.heroCards].sort(byOrderAndId),
	programItems: [...data.programItems].sort(byOrderAndId),
	speakerHighlights: [...data.speakerHighlights].sort(byOrderAndId),
});
