import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Props {
	successMessage: string;
	setStep: (step: "login") => void;
	successMessageDescription?: string;
}

const SuccessAuth: React.FC<Props> = ({ successMessage, setStep, successMessageDescription }) => {
	const t = useTranslations("auth");
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.2 }}
			className="text-center"
		>
			<div className="text-xl font-bold mb-4">{successMessage}</div>
			{successMessageDescription && <p className="text-[#9E9E9E] mb-6">{successMessageDescription}</p>}
			<button onClick={() => setStep("login")} className="text-primary hover:text-primary/80 font-medium transition-colors">
				{t("backToLogin")}
			</button>
		</motion.div>
	);
};

export default SuccessAuth;
