import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import Container from "@/shared/ui/Container";
import ChangePasswordForm from "@/features/profile/ui/ChangePasswordForm";

const page = () => {
	return (
		<Container className="mt-[74px] md:mt-25">
			<Breadcrumbs
				items={[{ label: "Главная", href: "/" }, { label: "Аккаунт", href: "/profile" }, { label: "Сменить пароль" }]}
				className=""
			/>
			<h2 className="mt-5 md:mt-10 font-semibold text-20 leading-118 tracking-neg-3 md:text-40 md:leading-100 md:tracking-neg-2">
				Смена пароля
			</h2>
			<ChangePasswordForm />
		</Container>
	);
};

export default page;
