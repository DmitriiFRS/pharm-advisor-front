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

type AuthStep = "login" | "register" | "recovery";

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const [step, setStep] = useState<AuthStep>("login");

	// Reset step when modal closes
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setTimeout(() => setStep("login"), 300); // Reset after animation
		}
		onClose(open);
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
								<LoginForm onRegister={() => setStep("register")} onRecovery={() => setStep("recovery")} onClose={onClose} />
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
								<RegisterForm onLogin={() => setStep("login")} onClose={onClose} />
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
					</AnimatePresence>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
