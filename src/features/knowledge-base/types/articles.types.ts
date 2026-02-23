import { IMedia } from "@/shared/types/media";
import { IMetaPagination } from "@/shared/types/pagination";

export interface Article {
	id: number;
	title: string;
	content: string;
	imageId: number;
	isPublished: boolean;
	pdfId: number | null;
	slug: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
	youtubeLink?: string | null;
	media: IMedia;
	pdf: IMedia;
}

export interface IArticleData {
	data: Article[];
	meta: IMetaPagination;
}
