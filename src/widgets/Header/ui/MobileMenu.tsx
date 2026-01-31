"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import uzflag from "@/assets/icons/common/header-uz.svg";
import call from "@/assets/icons/common/header-call.svg";
import cabinet from "@/assets/icons/common/header-cabinet.svg";
import logo from "@/assets/images/common/logo.webp";
import BlackButton from "@/shared/ui/BlackButton";

interface MobileMenuProps {
	onClose: () => void;
}

const NAV_LINKS = [
	{ href: "/education", label: "Обучение" },
	{ href: "/knowledge-base", label: "База знаний" },
	{ href: "/contacts", label: "Контакты" },
];

const menuVariants: Variants = {
	initial: {
		opacity: 0,
		y: "-100%",
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		opacity: 0,
		y: "-100%",
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const containerVariants: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
	return (
		<motion.div
			variants={menuVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="fixed inset-0 z-60 flex flex-col bg-white md:hidden"
		>
			{/* Header Section */}
			<div className="flex items-center justify-between px-4 py-4">
				<div className="flex-1 flex justify-center">
					<Link href="/" onClick={onClose}>
						<Image src={logo} alt="Pharm Advisor Logo" width={120} height={40} className="h-10 w-auto object-contain" priority />
					</Link>
				</div>
				<button
					onClick={onClose}
					className="absolute right-4 top-4 p-2 text-foreground hover:bg-gray-100 rounded-full transition-colors"
					aria-label="Close menu"
				>
					<X size={32} strokeWidth={2.5} className="text-gray-500" />
				</button>
			</div>

			{/* Navigation Links */}
			<motion.div variants={containerVariants} className="flex flex-col items-center justify-center flex-1 gap-8">
				{NAV_LINKS.map((link) => (
					<motion.div key={link.href} variants={itemVariants}>
						<Link
							href={link.href}
							onClick={onClose}
							className="text-20 font-medium leading-130 tracking-neg-2 text-center text-[#151616] hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					</motion.div>
				))}
			</motion.div>

			{/* Footer Section */}
			<motion.div variants={itemVariants} className="flex flex-col items-center gap-8 pb-10 px-4">
				<div className="flex items-center gap-4">
					<button className="size-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px] hover:bg-gray-200 transition-colors">
						<Image src={call} alt="Call" width={10} height={10} />
					</button>
					<button className="size-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px] hover:bg-gray-200 transition-colors">
						<Image src={cabinet} alt="Cabinet" width={10} height={10} />
					</button>
					<div className="size-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
						<Image src={uzflag} alt="Language" width={10} height={10} />
					</div>
				</div>
				<BlackButton onClick={onClose} className="text-10 w-full max-w-[300px] h-12">
					Обсудить проект
				</BlackButton>
			</motion.div>
		</motion.div>
	);
};
