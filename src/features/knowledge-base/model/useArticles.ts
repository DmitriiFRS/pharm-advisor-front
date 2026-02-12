/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useData } from "@/shared/api/hooks/useData";
import { Article, IArticleData } from "@/features/knowledge-base/types/articles.types";

export const useArticles = ({ itemsPerPage = 6 }: { itemsPerPage?: number }) => {
	const [page, setPage] = useState(1);
	const [articles, setArticles] = useState<Article[]>([]);
	const [hasMore, setHasMore] = useState(true);

	const { data, loading } = useData<IArticleData>("articles", {
		page,
		limit: itemsPerPage,
	});

	useEffect(() => {
		if (data) {
			if (page === 1) {
				setArticles(data.data);
			} else {
				setArticles((prev) => [...prev, ...data.data]);
			}
			setHasMore(data.meta.page < data.meta.totalPages);
		}
	}, [data, page]);

	const loadMore = () => {
		setPage((prev) => prev + 1);
	};

	return { articles, loadMore, hasMore, loading };
};
