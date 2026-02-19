"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import logo from "@/assets/images/common/logo.webp";
import FeedbackFormModal from "./FeedbackFormModal";
import FeedbackSuccess from "./FeedbackSuccess";

interface Props {
	isOpen: boolean;
	onClose: (open: boolean) => void;
}

const ApplicationModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const [isSuccess, setIsSuccess] = useState(false);

	const handleClose = (open: boolean) => {
		onClose(open);
		if (!open) {
			setTimeout(() => setIsSuccess(false), 300);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[410px] flex flex-col items-center p-10 gap-6 [&>button]:top-6 [&>button]:right-6 overflow-hidden">
				<div className="relative w-[180px] h-[60px]">
					<Image src={logo} alt="Pharm Advisor" fill className="object-contain" priority />
				</div>
				<div className="w-full relative">
					{!isSuccess ? (
						<>
							<DialogTitle className="text-xl font-bold text-center mb-4 text-[28px]">Оставить заявку</DialogTitle>
							<FeedbackFormModal onSuccess={() => setIsSuccess(true)} />
						</>
					) : (
						<FeedbackSuccess onClose={() => handleClose(false)} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ApplicationModal;
