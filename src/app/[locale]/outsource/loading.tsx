import { getTranslations } from "next-intl/server";

import Spinner from "@/shared/ui/Spinner";

export default async function OutsourceLoading() {
	const t = await getTranslations("outsource.states");

	return (
		<div className="flex min-h-[60dvh] items-center justify-center bg-[#f5f5f7]" role="status" aria-live="polite">
			<Spinner className="size-8 text-[#b52d66]" />
			<span className="sr-only">{t("loading")}</span>
		</div>
	);
}
