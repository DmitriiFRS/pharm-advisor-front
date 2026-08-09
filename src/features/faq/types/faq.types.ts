export interface FaqItem {
	id: number | string;
	question: string;
	answer: string;
}

export interface IFaq extends FaqItem {
	id: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface IFaqData {
	data: IFaq[];
	meta: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
}
