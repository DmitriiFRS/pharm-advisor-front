import { getTranslations } from "next-intl/server";

import NotFoundContent from "@/shared/ui/NotFoundContent";

export default async function LocalizedNotFound() {
	const t = await getTranslations("common.notFound");

	return (
		<div className="min-h-[60dvh] bg-[#f5f5f7] pt-24">
			<NotFoundContent>{t("description")}</NotFoundContent>
		</div>
	);
}
