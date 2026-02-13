"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import logo from "@/assets/images/common/logo.webp";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RecoveryForm from "./RecoveryForm";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	isOpen: boolean;
	onClose: (open: boolean) => void;
}

type AuthStep = "login" | "register" | "recovery" | "success-registration";

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const [step, setStep] = useState<AuthStep>("login");
	const [successMessage, setSuccessMessage] = useState<string>("");

	// Reset step when modal closes
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setTimeout(() => {
				setStep("login");
				setSuccessMessage("");
			}, 300); // Reset after animation
		}
		onClose(open);
	};

	const handleSuccess = (message?: string) => {
		if (message) setSuccessMessage(message);
		setStep("success-registration");
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[410px] flex flex-col items-center p-10 gap-6 [&>button]:top-6 [&>button]:right-6 overflow-hidden">
				<div className="relative w-[180px] h-[60px]">
					<Image src={logo} alt="Pharm Advisor" fill className="object-contain" priority />
				</div>
				<div className="w-full relative">
					<AnimatePresence mode="wait" initial={false}>
						{step === "login" && (
							<motion.div
								key="login"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.2 }}
							>
								<LoginForm
									onRegister={() => setStep("register")}
									onRecovery={() => setStep("recovery")}
									onSuccessRegistration={handleSuccess}
									onClose={onClose}
								/>
							</motion.div>
						)}
						{step === "register" && (
							<motion.div
								key="register"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2 }}
							>
								<RegisterForm onLogin={() => setStep("login")} onClose={onClose} onSuccessRegistration={handleSuccess} />
							</motion.div>
						)}
						{step === "recovery" && (
							<motion.div
								key="recovery"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2 }}
							>
								<RecoveryForm onLogin={() => setStep("login")} onRegister={() => setStep("register")} />
							</motion.div>
						)}
						{step === "success-registration" && (
							<motion.div
								key="success-registration"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.2 }}
								className="text-center"
							>
								<div className="text-xl font-bold mb-4">{successMessage || "Регистрация прошла успешно"}</div>
								<p className="text-[#9E9E9E] mb-6">Пожалуйста, проверьте вашу почту для подтверждения аккаунта</p>
								<button
									onClick={() => setStep("login")}
									className="text-primary hover:text-primary/80 font-medium transition-colors"
								>
									Вернуться к входу
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
