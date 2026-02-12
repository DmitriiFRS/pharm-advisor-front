"use client";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ArticleModal from "./ArticleModal";
import { Article } from "../model/types";

interface Props {
	article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
	const imageUrl = article.media?.url ? process.env.NEXT_PUBLIC_MEDIA_URL + article.media?.url : "/assets/images/placeholder.webp";
	const date = article.publishedAt
		? new Date(article.publishedAt).toLocaleDateString("ru-RU")
		: new Date(article.createdAt).toLocaleDateString("ru-RU");
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="group flex flex-col gap-4 cursor-pointer">
					<div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
						<Image src={imageUrl} alt={article.title} fill className="object-cover" unoptimized />
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-14 leading-130 tracking-neg-2">{date}</span>
						<h3 className="text-16 font-medium leading-130 tracking-neg-1 line-clamp-3 text-left">{article.title}</h3>
					</div>
				</div>
			</DialogTrigger>
			<ArticleModal article={article} />
		</Dialog>
	);
};

export default ArticleCard;
