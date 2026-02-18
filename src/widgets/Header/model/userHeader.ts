"use client";
import { useState } from "react";

export const useHeader = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

	const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	const openAuthModal = () => setIsAuthModalOpen(true);
	const closeAuthModal = () => setIsAuthModalOpen(false);

	const openApplicationModal = () => setIsApplicationModalOpen(true);
	const closeApplicationModal = () => setIsApplicationModalOpen(false);

	return {
		isMobileMenuOpen,
		toggleMenu,
		closeMobileMenu,
		isAuthModalOpen,
		openAuthModal,
		closeAuthModal,
		isApplicationModalOpen,
		openApplicationModal,
		closeApplicationModal,
	};
};
