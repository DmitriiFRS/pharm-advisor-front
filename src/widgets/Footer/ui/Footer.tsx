"use client";

import Container from "@/shared/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { FOOTER_MENU, FOOTER_SERVICES, SOCIAL_CONTACTS, SOCIAL_NEWS } from "@/shared/config/navigation";
import { GoogleMap } from "./GoogleMap";

export const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="bg-[#F4F4F4] lg:border-t lg:border-grey-primary">
			<Container className="lg:grid lg:grid-cols-2 relative">
				<div className="border-b border-grey-primary pb-10 border-t pt-10 lg:order-2 lg:border-b-0 lg:border-t-0 lg:pt-0 lg:pb-0">
					<div className="flex justify-center lg:absolute lg:left-0 lg:top-15">
						<Image src="/assets/images/common/logo.webp" alt="Pharm Advisor" width={83} height={40} />
					</div>
					<FooterNav />
				</div>
				<div className="pt-10 lg:order-1 lg:pt-15 lg:grid lg:grid-cols-2 mb-10 lg:mb-15">
					<FooterContacts />
				</div>
				<button className="absolute bottom-0 right-2.5 cursor-pointer lg:bottom-15" onClick={scrollToTop}>
					<Image src="/assets/icons/common/to-the-top.svg" alt="To the top" width={50} height={50} />
				</button>
			</Container>
			<GoogleMap />
		</footer>
	);
};

const FooterNav = () => {
	return (
		<nav className="mt-10 lg:mt-0 flex justify-between xs:justify-start xs:gap-20 lg:gap-25 lg:border-l lg:border-grey-primary h-full lg:pl-10 lg:pt-15">
			<div className="flex flex-col gap-2 text-11">
				<span className="text-[#626263] font-semibold">Меню</span>
				{FOOTER_MENU.map((item) => (
					<Link key={item.name} href={item.href} className="text-black leading-200 font-semibold">
						{item.name}
					</Link>
				))}
			</div>
			<div className="flex flex-col gap-2 text-11">
				<span className="text-[#626263] font-semibold">Услуги</span>
				{FOOTER_SERVICES.map((item) => (
					<Link key={item.name} href={item.href} className="text-black leading-200 font-semibold">
						{item.name}
					</Link>
				))}
			</div>
		</nav>
	);
};

const FooterContacts = () => {
	return (
		<>
			<div className="hidden lg:block order-1"></div>
			<div className="flex flex-col gap-2 text-16 leading-118 font-semibold lg:order-2">
				<a href="tel:+998901234567" target="_blank" rel="noopener noreferrer">
					+998 (90) 123-45-67
				</a>
				<a href="mailto:pharmadvisor@gmailcom" target="_blank" rel="noopener noreferrer">
					pharmadvisor@gmailcom
				</a>
			</div>
			<div className="flex flex-col gap-6 mt-12.5 lg:mt-10 lg:order-3">
				<div className="flex items-center gap-3">
					<span className="text-[#858585] text-sm min-w-[80px]">Связаться:</span>
					<div className="flex gap-3">
						{SOCIAL_CONTACTS.map((item) => (
							<Link key={item.name} href={item.href} className="hover:opacity-80 transition-opacity">
								<Image src={item.icon} alt={item.name} width={24} height={24} />
							</Link>
						))}
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
			<div className="mt-10 text-11 leading-130 font-medium flex flex-col gap-2 lg:order-2 lg:mt-[25px]">
				<span className="opacity-60">Адрес</span>
				<p className="max-w-45 text-16 leading-140 font-medium">
					Город Ташкент, Яккасарайский район, улица Абдуллы Каххара, 9-й проезд, дом 16а
				</p>
			</div>
			<div className="mt-10 text-10 leading-160 text-[#626263] lg:order-4 lg:mt-20">Политика конфиденциальности</div>
		</>
	);
};
