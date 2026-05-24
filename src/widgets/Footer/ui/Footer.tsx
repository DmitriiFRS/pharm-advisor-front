"use client";

import Container from "@/shared/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_CONTACTS } from "@/shared/config/navigation";
import { GoogleMap } from "./GoogleMap";
import { useScroll } from "@/shared/lib/context/ScrollContext";
import { IContacts } from "@/entities/company/model/types";
import { useEffect } from "react";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Footer = ({ contacts }: { contacts: IContacts | undefined }) => {
	const { contactRef, scrollToContacts } = useScroll();
	const searchParams = useSearchParams();

	useEffect(() => {
		const section = searchParams.get("section");
		if (section === "contacts") {
			setTimeout(() => {
				scrollToContacts();
			}, 100);
		}
	}, [searchParams, scrollToContacts]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<footer ref={contactRef} className="bg-[#F4F4F4] lg:border-t lg:border-grey-primary">
			<Container className="lg:grid lg:grid-cols-2 relative">
				<div className="border-b border-grey-primary pb-10 border-t pt-10 lg:order-2 lg:border-b-0 lg:border-t-0 lg:pt-0 lg:pb-0">
					<div className="flex justify-center lg:absolute lg:left-0 lg:top-15">
						<Image src="/assets/images/common/logo.webp" alt="Pharm Advisor" width={83} height={40} />
					</div>
					<FooterNav />
				</div>
				<div className="pt-10 lg:order-1 lg:pt-15 lg:grid lg:grid-cols-2 mb-10 lg:mb-15">
					<FooterContacts contacts={contacts} />
				</div>
				<button className="absolute bottom-0 right-2.5 cursor-pointer lg:bottom-15" onClick={scrollToTop}>
					<Image src="/assets/icons/common/to-the-top.svg" alt="To the top" width={50} height={50} />
				</button>
			</Container>
			{contacts?.googleMapsLink && <GoogleMap link={contacts.googleMapsLink} />}
		</footer>
	);
};

const FooterNav = () => {
	const { scrollToContacts, scrollToAdvantages } = useScroll();
	const pathname = usePathname();
	const router = useRouter();

	const t = useTranslations("common.footer");

	const FOOTER_MENU = [
		{ name: t("menu.home"), realName: "Главная", href: "/" },
		// { name: "Преимущества", href: "/advantages" },
		{ name: t("menu.services"), realName: "Услуги", href: "/#advantages" },
		// { name: "Новости", href: "/news" },
		{ name: t("menu.contacts"), realName: "Контакты", href: "/contacts" },
	];

	const FOOTER_SERVICES = [
		{ name: t("services.education"), href: "/education" },
		{ name: t("services.knowledgeBase"), href: "/knowledge-base" },
	];

	const handleNavigation = (name: string, href: string) => {
		if (name === t("menu.services")) {
			if (pathname !== "/") {
				router.push("/");
				setTimeout(() => {
					scrollToAdvantages();
				}, 500);
				router.push("/?section=advantages");
			} else {
				scrollToAdvantages();
			}
		} else if (name === t("menu.contacts")) {
			if (pathname !== "/") {
				router.push("/?section=contacts");
			} else {
				scrollToContacts();
			}
		} else {
			router.push(href);
		}
	};

	return (
		<nav className="mt-10 lg:mt-0 flex justify-between xs:justify-start xs:gap-20 lg:gap-25 lg:border-l lg:border-grey-primary h-full lg:pl-10 lg:pt-15">
			<div className="flex flex-col gap-2 text-14">
				<span className="text-[#626263] font-semibold">{t("menuTitle")}</span>
				{FOOTER_MENU.map((item) => (
					<div
						key={item.name}
						onClick={() => handleNavigation(item.name, item.href)}
						className="text-black leading-200 font-semibold cursor-pointer hover:opacity-70 transition-opacity"
					>
						{item.name}
					</div>
				))}
			</div>
			<div className="flex flex-col gap-2 text-14">
				<span className="text-[#626263] font-semibold">{t("servicesTitle")}</span>
				{FOOTER_SERVICES.map((item) => (
					<Link key={item.name} href={item.href} className="text-black leading-200 font-semibold">
						{item.name}
					</Link>
				))}
			</div>
		</nav>
	);
};

const FooterContacts = ({ contacts }: { contacts?: IContacts | undefined }) => {
	const t = useTranslations("common.footer");
	const displayPhone = contacts?.phone && /\d/.test(contacts.phone) ? contacts.phone : undefined;

	return (
		<>
			<div className="hidden lg:block order-1"></div>
			<div className="flex flex-col gap-2 text-16 leading-118 font-semibold lg:order-2">
				{displayPhone && (
					<a href={`tel:${displayPhone}`} target="_blank" rel="noopener noreferrer">
						{displayPhone}
					</a>
				)}
				{contacts?.email && (
					<a href={`mailto:${contacts.email}`} target="_blank" rel="noopener noreferrer">
						{contacts.email}
					</a>
				)}
			</div>
			<div className="flex flex-col gap-6 mt-12.5 lg:mt-10 lg:order-3">
				<div className="flex items-center gap-3">
					<span className="opacity-60 text-14 min-w-[80px]">{t("connectTitle")}</span>
					<div className="flex gap-3">
						{SOCIAL_CONTACTS.map((item) => {
							let href = item.href;
							if (item.name === "Telegram" && contacts?.telegramLink) {
								href = contacts.telegramLink;
							}
							// Fallback for visual consistency if we want to show it even if link is missing?
							// Or just pass the link. If link is '#' it does nothing.
							return (
								<Link key={item.name} href={href} className="hover:opacity-80 transition-opacity" target="_blank">
									<Image src={item.icon} alt={item.name} width={24} height={24} />
								</Link>
							);
						})}
						{contacts?.instagramLink && (
							<Link href={contacts.instagramLink} className="hover:opacity-80 transition-opacity" target="_blank">
								<Image src="/assets/icons/common/header-ru.svg" alt="Instagram" width={24} height={24} className="hidden" />
							</Link>
						)}
					</div>
				</div>
				{/* <div className="flex items-center gap-3">
					<span className="text-[#858585] text-sm min-w-[80px]">Новости:</span>
					<div className="flex gap-3">
						{SOCIAL_NEWS.map((item) => (
							<Link key={item.name} href={item.href} className="hover:opacity-80 transition-opacity">
								<Image src={item.icon} alt={item.name} width={24} height={24} />
							</Link>
						))}
					</div>
				</div> */}
			</div>
			<div className="mt-10 leading-130 flex flex-col gap-2 lg:order-2 lg:mt-[25px]">
				<span className="opacity-60 text-14">{t("addressTitle")}</span>
				<p className="max-w-45 text-16 leading-140 font-medium">
					{contacts?.googleMapsLink ? (
						<a href={contacts.googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
							{contacts?.address ?? t("address")}
						</a>
					) : (
						contacts?.address ?? t("address")
					)}
				</p>
			</div>
			<Link href="/privacy" className="mt-10 text-14 leading-160 text-[#626263] lg:order-4 lg:mt-20 hover:underline">
				{t("policy")}
			</Link>
		</>
	);
};
