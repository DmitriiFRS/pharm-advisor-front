import Link from "next/link";
import { useScroll } from "@/shared/lib/context/ScrollContext";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
	{ href: "/education", label: "education" },
	{ href: "/knowledge-base", label: "knowledgeBase" },
	{ href: "/contacts", label: "contacts" },
];

export const DesktopNav = () => {
	const t = useTranslations("common.header");
	const { scrollToContacts } = useScroll();

	return (
		<nav className="hidden md:flex md:gap-5 ml-8">
			{NAV_LINKS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
					onClick={(e) => {
						if (link.href === "/contacts") {
							e.preventDefault();
							scrollToContacts();
						}
					}}
				>
					{t(link.label)}
				</Link>
			))}
		</nav>
	);
};
