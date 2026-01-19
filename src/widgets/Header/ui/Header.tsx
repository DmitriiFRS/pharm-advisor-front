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
		<header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-[1200px]">
				{/* Logo */}
				<Link href="/" className="flex-shrink-0">
					<Image src={logo} alt="Pharm Advisor Logo" width={120} height={40} className="h-10 w-auto object-contain" priority />
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
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
				<div className="hidden md:flex items-center gap-4">
					<div className="flex items-center gap-3">
						<button className="p-1 hover:opacity-80 transition-opacity">
							<Image src={uzflag} alt="Language" width={24} height={24} />
						</button>
						<button className="p-1 hover:opacity-80 transition-opacity">
							<Image src={call} alt="Call" width={24} height={24} />
						</button>
						<button className="p-1 hover:opacity-80 transition-opacity">
							<Image src={cabinet} alt="Cabinet" width={24} height={24} />
						</button>
					</div>
					<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
						Обсудить проект
					</button>
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
						className="md:hidden overflow-hidden bg-background border-b border-border absolute top-16 left-0 w-full shadow-lg"
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
