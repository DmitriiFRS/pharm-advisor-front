const mokData = [
	{
		id: 1,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 2,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 3,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 4,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 5,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 6,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 7,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 8,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
	{
		id: 9,
		date: "12.12.2025",
		title: "Тренды фарммаркетинга в Узбекистане: ключевые изменения рынка в 2025 году",
		image: "/assets/images/knowledge-base/mok-img.webp",
	},
];

import { useState } from "react";

export const useArticles = () => {
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 6;

	const articles = mokData.slice(0, page * ITEMS_PER_PAGE);
	const hasMore = articles.length < mokData.length;

	const loadMore = () => {
		setPage((prev) => prev + 1);
	};

	return { articles, loadMore, hasMore };
};
