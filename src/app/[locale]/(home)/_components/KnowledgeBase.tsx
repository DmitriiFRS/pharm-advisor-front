"use client";

import Image from "next/image";
import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { ChevronRight } from "lucide-react";
import { useArticles } from "@/features/knowledge-base/model/useArticles";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ArticleModal from "@/features/knowledge-base/ui/ArticleModal";

import NotFoundContent from "@/shared/ui/NotFoundContent";

const KnowledgeBase = () => {
	const { articles } = useArticles({ itemsPerPage: 3 });

	return (
		<section className="pt-15 md:pt-30">
			<Container>
				<h2 className="text-26 md:text-39 font-bold text-center text-black-primary leading-100">База знаний</h2>
				{articles.length > 0 ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 md:mt-10 md:gap-3">
							{articles.map((article, index) => {
								const imageUrl = article.media?.url
									? process.env.NEXT_PUBLIC_MEDIA_URL + article.media?.url
									: "/assets/images/placeholder.webp";
								return (
									<Dialog key={index}>
										<DialogTrigger>
											<div className="flex flex-col group cursor-pointer">
												<div className="relative w-full aspect-square rounded-[20px] overflow-hidden">
													<Image
														src={imageUrl}
														alt={article.title}
														fill
														className="object-cover transition-transform duration-300 group-hover:scale-105"
														unoptimized
													/>
												</div>
												<p className="mt-5 text-16 font-medium text-black-primary leading-130 tracking-neg-1">
													{article.title}
												</p>
											</div>
										</DialogTrigger>
										<ArticleModal article={article} />
									</Dialog>
								);
							})}
						</div>
						<div className="mt-10 flex justify-center">
							<PrimaryButton href="/knowledge-base" className="text-white flex items-center justify-center">
								<span className="mr-2">Смотреть все</span>
								<ChevronRight size={15} />
							</PrimaryButton>
						</div>
					</>
				) : (
					<NotFoundContent>Статьи не найдены</NotFoundContent>
				)}
			</Container>
		</section>
	);
};

export default KnowledgeBase;
