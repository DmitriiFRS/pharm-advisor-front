export interface Media {
	id: number;
	url: string;
	fileName: string;
	mimeType: string;
	size: number;
}

export interface OutsourceHeroCard {
	id: number;
	title: string;
	subtitle: string;
	order: number;
	icon: Media | null;
}

export interface OutsourceProgramItem {
	id: number;
	title: string;
	description: string;
	order: number;
}

export interface OutsourceSpeakerHighlight {
	id: number;
	title: string;
	description: string;
	order: number;
}

export interface OutsourcePageData {
	id: number;
	startsAt: string;
	heroTitle: string;
	programTitle: string;
	speakerName: string;
	speakerRole: string;
	speakerHeadline: string;
	speakerDescription: string;
	programImage: Media | null;
	speakerImage: Media | null;
	heroCards: OutsourceHeroCard[];
	programItems: OutsourceProgramItem[];
	speakerHighlights: OutsourceSpeakerHighlight[];
}

export interface OutsourceFaqItem {
	id: number;
	question: string;
	answer: string;
	createdAt: string;
	updatedAt: string;
}

export interface ApiResponse<T> {
	data: T;
	meta: Record<string, unknown> | null;
}

export type OutsourcePageResponse = ApiResponse<OutsourcePageData | null>;
export type OutsourceFaqResponse = ApiResponse<OutsourceFaqItem[]>;
