import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import Container from "@/shared/ui/Container";
import { privacyPolicyData } from "@/shared/constants/policy.data";

export default async function PrivacyPolicyPage() {
	const t = await getTranslations("common.footer");

	const breadcrumbItems = [{ label: t("menu.home"), href: "/" }, { label: t("policy") }];

	return (
		<main className="flex-1 pt-[80px] md:pt-[100px] pb-30">
			<Container>
				<Breadcrumbs items={breadcrumbItems} className="mb-8" />

				<div className="rounded-[10px] text-grey-primary">
					{privacyPolicyData.map((section, index) => (
						<div key={index} className="mb-6 last:mb-0">
							{index === 0 ? (
								<h1 className="text-18 md:text-24 font-bold mb-4">{section.title}</h1>
							) : (
								<h2 className="text-16 md:text-18 font-bold mb-3">{section.title}</h2>
							)}

							<div className="flex flex-col gap-2">
								{section.content.map((paragraph, pIndex) => (
									<p key={pIndex} className="text-13 md:text-14 leading-150 text-grey-primary">
										{paragraph}
									</p>
								))}
							</div>
						</div>
					))}
				</div>
			</Container>
		</main>
	);
}
