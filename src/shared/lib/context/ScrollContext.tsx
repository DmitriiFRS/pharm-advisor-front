"use client";

import { createContext, useContext, useRef, ReactNode } from "react";

interface ScrollContextType {
	contactRef: React.RefObject<HTMLElement | null>;
	scrollToContacts: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const contactRef = useRef<HTMLElement>(null);

	const scrollToContacts = () => {
		contactRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return <ScrollContext.Provider value={{ contactRef, scrollToContacts }}>{children}</ScrollContext.Provider>;
};

export const useScroll = () => {
	const context = useContext(ScrollContext);
	if (context === undefined) {
		throw new Error("useScroll must be used within a ScrollProvider");
	}
	return context;
};
