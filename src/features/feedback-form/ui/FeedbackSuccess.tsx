"use client";

import PrimaryButton from "@/shared/ui/PrimaryButton";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
	onClose: () => void;
}

const FeedbackSuccess = ({ onClose }: Props) => {
	const t = useTranslations("feedback");
	return (
		<div className="flex flex-col items-center justify-center text-center w-full animate-in fade-in zoom-in duration-300">
			<div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
				<CheckCircle className="w-8 h-8 text-green-600" />
			</div>
			<h3 className="text-xl font-bold mb-2">{t("successTitle")}</h3>
			<p className="text-gray-500 mb-8 max-w-[280px]">{t("successDesc")}</p>
			<PrimaryButton onClick={onClose} className="w-full flex justify-center">
				{t("successButton")}
			</PrimaryButton>
		</div>
	);
};

export default FeedbackSuccess;
