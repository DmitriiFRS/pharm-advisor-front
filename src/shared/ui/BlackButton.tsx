"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	href?: string;
	type?: "button" | "submit" | "reset";
}

const BlackButton: React.FC<Props> = ({ className, children, onClick, href, type = "button" }) => {
	const t = useTranslations("common.buttons");
	const content = children || t("learnMore");

	return href ? (
		<Link
			href={href}
			className={`cursor-pointer w-full h-[50px] bg-black text-white text-[14px] font-medium rounded-[8px] flex items-center justify-center hover:bg-black/80 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ${className}`}
		>
			{content}
		</Link>
	) : (
		<button
			type={type}
			onClick={onClick}
			className={`cursor-pointer w-full h-[50px] bg-black text-white text-[14px] font-medium rounded-[8px] flex items-center justify-center hover:bg-black/80 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ${className}`}
		>
			{content}
		</button>
	);
};

export default BlackButton;
