import Image from "next/image";
import call from "@/assets/icons/common/header-call.svg";
import BlackButton from "@/shared/ui/BlackButton";
import { LangSwitcher } from "./LangSwitcher";
import { ProfileButton } from "./ProfileButton";
import { useTranslations } from "next-intl";

interface Props {
	openAuthModal: () => void;
	openAppModal: () => void;
}

export const HeaderActions = ({ openAuthModal, openAppModal }: Props) => {
	const t = useTranslations("common.header");

	return (
		<div className="hidden md:flex ml-8 md:gap-[7px] md:items-center">
			<a
				target="_blank"
				href="tel:+998971234567"
				className="h-10 min-h-10 w-10 min-w-10 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]"
			>
				<Image src={call} alt="Call" width={30} height={30} className="size-[15px]" />
			</a>

			<ProfileButton onAuthRequired={openAuthModal} />
			<LangSwitcher />

			<BlackButton onClick={openAppModal} className="w-full min-w-45 h-10!">
				{t("discussProject")}
			</BlackButton>
		</div>
	);
};
