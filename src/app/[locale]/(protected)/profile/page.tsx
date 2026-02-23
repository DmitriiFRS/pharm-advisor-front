import ProfileForm from "@/features/profile/ui/ProfileForm";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import Container from "@/shared/ui/Container";
import { getTranslations } from "next-intl/server";

const page = async () => {
	const t = await getTranslations("profile");
	return (
		<Container className="mt-[74px] md:mt-25">
			<Breadcrumbs items={[{ label: t("breadcrumbs.home"), href: "/" }, { label: t("breadcrumbs.account") }]} className="" />
			<h2 className="mt-5 md:mt-10 font-semibold text-20 leading-118 tracking-neg-3 md:text-40 md:leading-100 md:tracking-neg-2">
				{t("title")}
			</h2>
			<ProfileForm />
		</Container>
	);
};

export default page;
