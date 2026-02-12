"use client";

import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useArticles } from "@/features/knowledge-base/model/useArticles";
import ArticleList from "@/features/knowledge-base/ui/ArticleList";

// interface Props {}

export const KnowledgeBaseGrid: React.FC = () => {
	const { articles, loadMore, hasMore, loading } = useArticles({ itemsPerPage: 6 });

	return (
		<div className="flex flex-col gap-10 md:gap-15 mt-10">
			{articles && <ArticleList articles={articles} />}

			{(hasMore || loading) && (
				<div className="flex justify-center">
					<PrimaryButton onClick={loadMore} className="text-white" disabled={loading}>
						{loading ? "Загрузка..." : "Смотреть еще"}
					</PrimaryButton>
				</div>
			)}
		</div>
	);
};
