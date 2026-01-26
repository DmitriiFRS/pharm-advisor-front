"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import uzflag from "@/assets/icons/common/header-uz.svg";
import call from "@/assets/icons/common/header-call.svg";
import cabinet from "@/assets/icons/common/header-cabinet.svg";
import logo from "@/assets/images/common/logo.webp";
import BlackButton from "@/shared/ui/BlackButton";
import { MobileMenu } from "./MobileMenu";
import AuthModal from "@/features/auth/ui/AuthModal";

const NAV_LINKS = [
	{ href: "/education", label: "Обучение" },
	{ href: "/knowledge-base", label: "База знаний" },
	{ href: "/contacts", label: "Контакты" },
];

export const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

	const toggleMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="fixed top-0 z-50 w-full">
			<div className="mx-auto flex items-center justify-between px-3.5 h-11 bg-white max-w-[760px] md:justify-start md:mt-2.5 md:rounded-[11px]">
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
					<button
						onClick={() => setIsAuthModalOpen(true)}
						className="h-7.5 min-h-7.5 w-7.5 min-w-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]"
					>
						<Image src={cabinet} alt="Cabinet" width={24} height={24} className="size-[9px]" />
					</button>
					<button className="h-7.5 min-h-7.5 w-7.5 min-w-7.5 flex items-center justify-center bg-[#F5F5F7] rounded-[8px]">
						<Image src={uzflag} alt="Language" width={24} height={24} className="size-[9px]" />
					</button>
					<BlackButton className="max-h-7.5 min-w-full">Обсудить проект</BlackButton>
				</div>

				{/* Mobile Burger Button */}
				<button className="md:hidden p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
					<Menu size={24} />
				</button>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>{isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}</AnimatePresence>

			<AuthModal isOpen={isAuthModalOpen} onClose={setIsAuthModalOpen} />
		</header>
	);
};
