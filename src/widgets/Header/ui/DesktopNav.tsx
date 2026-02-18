import Link from "next/link";
import { useScroll } from "@/shared/lib/context/ScrollContext";

const NAV_LINKS = [
	{ href: "/education", label: "Обучение" },
	{ href: "/knowledge-base", label: "База знаний" },
	{ href: "/contacts", label: "Контакты" },
];

export const DesktopNav = () => {
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
					{link.label}
				</Link>
			))}
		</nav>
	);
};
