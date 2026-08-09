import { getTranslations } from "next-intl/server";

import NotFoundContent from "@/shared/ui/NotFoundContent";

export default async function OutsourceNotFound() {
	const t = await getTranslations("outsource.states");

	return (
		<div className="min-h-[60dvh] bg-[#f5f5f7] pt-24">
			<NotFoundContent>{t("notFound")}</NotFoundContent>
		</div>
	);
}
