"use client";

import { useTranslations } from "next-intl";

import Container from "@/shared/ui/Container";
import PrimaryButton from "@/shared/ui/PrimaryButton";

interface OutsourceErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function OutsourceError({ reset }: OutsourceErrorProps) {
	const t = useTranslations("outsource.states");

	return (
		<div className="flex min-h-[60dvh] items-center bg-[#f5f5f7] py-20">
			<Container className="w-full">
				<div className="mx-auto max-w-[560px] text-center">
					<h1 className="text-28 font-semibold leading-tight text-black md:text-40">{t("errorTitle")}</h1>
					<p className="mt-4 text-14 leading-relaxed text-grey-primary md:text-16">{t("errorDescription")}</p>
					<PrimaryButton onClick={reset} className="mx-auto mt-8">
						{t("retry")}
					</PrimaryButton>
				</div>
			</Container>
		</div>
	);
}
