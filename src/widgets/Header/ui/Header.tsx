"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import uzflag from "@/assets/icons/common/header-uz.svg";
import call from "@/assets/icons/common/header-call.svg";
import cabinet from "@/assets/icons/common/header-cabinet.svg";
import logo from "@/assets/images/common/logo.webp";
import BlackButton from "@/shared/ui/BlackButton";

const NAV_LINKS = [
	{ href: "/education", label: "Обучение" },
	{ href: "/knowledge-base", label: "База знаний" },
	{ href: "/contacts", label: "Контакты" },
];

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="fixed top-0 z-50 w-full">
			<div className="mt-2.5 mx-auto flex items-center justify-between px-3.5 rounded-[11px] h-11 bg-white max-w-[760px] md:justify-start">
				{/* Logo */}
				<Link href="/">
					<Image src={logo} alt="Pharm Advisor Logo" width={120} height={40} className="h-10 w-auto object-contain" priority />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex md:gap-5 ml-8">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Desktop Right Section (Icons + Button) */}
				<div className="hidden md:flex ml-8 md:gap-[7px] md:items-center">
					<button className="h-7.5 min-h-7.5 w-7.5 min-w-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
						<Image src={call} alt="Call" width={24} height={24} className="size-[9px]" />
					</button>
					<button className="h-7.5 min-h-7.5 w-7.5 min-w-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
						<Image src={cabinet} alt="Cabinet" width={24} height={24} className="size-[9px]" />
					</button>
					<div className="h-7.5 min-h-7.5 w-7.5 min-w-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
						<Image src={uzflag} alt="Language" width={24} height={24} className="size-[9px]" />
					</div>
					<BlackButton className="max-h-7.5 min-w-full">Обсудить проект</BlackButton>
				</div>

				{/* Mobile Burger Button */}
				<button className="md:hidden p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="md:hidden overflow-hidden border-b border-border absolute top-16 left-0 w-full shadow-lg bg-white"
					>
						<nav className="flex flex-col p-4 gap-4">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.label}
								</Link>
							))}
							<div className="flex items-center gap-4 mt-4 justify-center">
								<button className="p-2">
									<Image src={uzflag} alt="Language" width={24} height={24} />
								</button>
								<button className="p-2">
									<Image src={call} alt="Call" width={24} height={24} />
								</button>
								<button className="p-2">
									<Image src={cabinet} alt="Cabinet" width={24} height={24} />
								</button>
							</div>
							<button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors mt-2">
								Обсудить проект
							</button>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
