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

export interface OutsourceSpeaker {
	id: number;
	outsourcePageId: number;
	name: string;
	role: string;
	headline: string;
	description: string;
	order: number;
	imageId: number | null;
	image: Media | null;
	highlights: OutsourceSpeakerHighlight[];
}

export interface OutsourcePageData {
	id: number;
	startsAt: string;
	heroTitle: string;
	programTitle: string;
	programImage: Media | null;
	heroCards: OutsourceHeroCard[];
	programItems: OutsourceProgramItem[];
	speakers: OutsourceSpeaker[];
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
