export interface IFaq {
	id: number;
	question: string;
	answer: string;
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
