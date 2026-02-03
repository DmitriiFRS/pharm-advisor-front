"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Category {
	id: string;
	name: string;
}

interface EducationFilterProps {
	className?: string;
	categories: Category[];
	minPriceLimit: number;
	maxPriceLimit: number;
}

export const EducationFilter: React.FC<EducationFilterProps> = ({ className, categories, minPriceLimit, maxPriceLimit }) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Initialize state from URL params or defaults
	const initialTypes = searchParams.getAll("type");
	const initialMinPrice = Number(searchParams.get("minPrice")) || minPriceLimit;
	const initialMaxPrice = Number(searchParams.get("maxPrice")) || maxPriceLimit;

	const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
	const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);

	const updateFilters = (types: string[], price: number[]) => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("type");
		types.forEach((type) => params.append("type", type));

		params.set("minPrice", price[0].toString());
		params.set("maxPrice", price[1].toString());

		router.push(`?${params.toString()}`, { scroll: false });
	};

	const handleTypeChange = (typeId: string, checked: boolean) => {
		const newTypes = checked ? [...selectedTypes, typeId] : selectedTypes.filter((id) => id !== typeId);

		setSelectedTypes(newTypes);
		updateFilters(newTypes, priceRange);
	};

	const handlePriceChange = (value: number[]) => {
		setPriceRange(value);
		updateFilters(selectedTypes, value);
	};

	return (
		<div className={`sticky top-20 bg-white h-max rounded-[20px] pt-7.5 pb-10 px-5 col-span-1 shadow-sm ${className}`}>
			<div className="">
				<h3 className="text-[#858585] text-[14px] font-bold mb-4">Тип:</h3>
				<div className="space-y-3">
					{categories.map((category) => (
						<div key={category.id} className="flex items-center space-x-2">
							<Checkbox
								id={category.id}
								checked={selectedTypes.includes(category.id)}
								onCheckedChange={(checked) => handleTypeChange(category.id, checked as boolean)}
								className="bg-[#f2f2f2] size-[18px]"
							/>
							<label
								htmlFor={category.id}
								className="text-[14px] text-black-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
							>
								{category.name}
							</label>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-[#aaa] text-[12px] font-semibold mb-4 mt-10">Цена:</h3>
				<div className="pt-2 pb-6 px-1">
					<Slider
						defaultValue={[minPriceLimit, maxPriceLimit]}
						max={maxPriceLimit}
						step={100}
						value={priceRange}
						onValueChange={handlePriceChange}
						className="h-1"
					/>
				</div>
				<div className="flex items-center justify-between gap-2">
					<div className="bg-[#F5F5F7] rounded-[8px] px-3 py-2 text-[13px] text-black-primary w-full">{priceRange[0]}</div>
					<div className="w-2 h-px bg-[#858585]"></div>
					<div className="bg-[#F5F5F7] rounded-[8px] px-3 py-2 text-[13px] text-black-primary w-full">{priceRange[1]}</div>
				</div>
			</div>
		</div>
	);
};
