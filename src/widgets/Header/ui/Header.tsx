"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import logo from "@/assets/images/common/logo.webp";

import AuthModal from "@/features/auth/ui/AuthModal";
import { ApplicationModal } from "@/features/feedback-form";

import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { MobileMenu } from "./MobileMenu";
import { useHeader } from "../model/userHeader";
import { IContacts } from "@/entities/company/model/types";

export const Header = ({ contacts }: { contacts: IContacts | undefined }) => {
	const {
		isMobileMenuOpen,
		toggleMenu,
		closeMobileMenu,
		isAuthModalOpen,
		openAuthModal,
		closeAuthModal,
		isApplicationModalOpen,
		openApplicationModal,
		closeApplicationModal,
	} = useHeader();

	return (
		<header className="fixed top-0 z-50 w-full pr-(--removed-body-scroll-bar-size)">
			<div className="mx-auto flex items-center justify-between px-3.5 h-[55px] bg-white max-w-[760px] md:justify-start md:mt-2.5 md:rounded-[11px]">
				<Link href="/">
					<Image src={logo} alt="Pharm Advisor Logo" width={120} height={40} className="h-10 w-auto object-contain" priority />
				</Link>
				<DesktopNav />
				<HeaderActions phone={contacts?.phone} openAuthModal={openAuthModal} openAppModal={openApplicationModal} />
				<button className="md:hidden p-2 text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
					<Menu size={24} />
				</button>
			</div>

			<AnimatePresence>{isMobileMenuOpen && <MobileMenu onClose={closeMobileMenu} />}</AnimatePresence>
			<ApplicationModal isOpen={isApplicationModalOpen} onClose={closeApplicationModal} />
			<AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
		</header>
	);
};
