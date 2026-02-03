import { EducationFilter } from "@/features/education-filter";
import { EducationList } from "@/features/education-list";

// Async Loading for SSR simulation
async function getEducationFilters() {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 100));
	return {
		categories: [
			{ id: "marketing", name: "Маркетинг" },
			{ id: "management", name: "Менеджмент" },
			{ id: "sales", name: "Продажи" },
			{ id: "production", name: "Производство" },
		],
		priceLimit: { min: 0, max: 20000 },
	};
}

export const EducationCatalog = async () => {
	const filters = await getEducationFilters();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
			<EducationFilter categories={filters.categories} minPriceLimit={filters.priceLimit.min} maxPriceLimit={filters.priceLimit.max} />
			<EducationList />
		</div>
	);
};
