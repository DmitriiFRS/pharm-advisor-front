import Link from "next/link";
import { useScroll } from "@/shared/lib/context/ScrollContext";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
	{ href: "/education", label: "education" },
	{ href: "/knowledge-base", label: "knowledgeBase" },
	{ href: "/contacts", label: "contacts" },
	{ href: "/outsource", label: "webinars" },
];

export const DesktopNav = () => {
	const t = useTranslations("common.header");
	const { scrollToContacts } = useScroll();

	return (
		<nav className="hidden min-w-0 md:ml-4 md:flex md:gap-3">
			{NAV_LINKS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="shrink-0 whitespace-nowrap text-13 font-medium text-foreground/80 transition-colors hover:text-foreground"
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
