"use client";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../model/types";

interface Props {
	article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
	return (
		<Link href={`/knowledge-base/${article.id}`} className="group flex flex-col gap-4">
			<div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
				<Image src={article.image} alt={article.title} fill className="object-cover" />
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-11 leading-130 tracking-neg-2">{article.date}</span>
				<h3 className="text-20 font-medium leading-130 tracking-neg-1 line-clamp-3">{article.title}</h3>
			</div>
		</Link>
	);
};

export default ArticleCard;
