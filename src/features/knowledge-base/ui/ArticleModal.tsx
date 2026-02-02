"use client";

import { Article } from "@/features/knowledge-base/model/types";
import Image from "next/image";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
	article: Article;
}

const ArticleModal: React.FC<Props> = ({ article }) => {
	const handleDownload = () => {
		if (article.file) {
			window.open(article.file, "_blank");
		}
	};

	return (
		<DialogContent className="max-w-[calc(100vw-32px)] md:max-w-[700px] lg:max-w-[900px] w-full p-6 md:p-10 gap-0 overflow-y-auto max-h-[90vh]">
			<DialogHeader className="sr-only">
				<DialogTitle>{article.title}</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col md:flex-row gap-6 md:gap-10">
				{/* Image Column */}
				<div className="shrink-0 w-full md:w-[280px] lg:w-[340px]">
					<div className="relative w-full aspect-340/360 rounded-[16px] overflow-hidden">
						<Image src={article.image} alt={article.title} fill className="object-cover" />
					</div>
				</div>

				{/* Content Column */}
				<div className="flex flex-col grow gap-6">
					<div className="flex flex-col gap-4">
						<h3 className="text-[20px] font-medium leading-[138%] tracking-neg-1 text-black">{article.title}</h3>
						<div className="text-[14px] font-normal leading-[120%] text-[#808080] whitespace-pre-wrap">{article.description}</div>
					</div>

					<div className="mt-auto pt-4 flex justify-end">
						<PrimaryButton onClick={handleDownload} className="w-auto! px-6 h-[44px]" disabled={!article.file}>
							Скачать полностью
						</PrimaryButton>
					</div>
				</div>
			</div>
		</DialogContent>
	);
};

export default ArticleModal;
