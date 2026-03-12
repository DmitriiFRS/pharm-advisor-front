import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NextTopLoader from "nextjs-toploader";
import { routing } from "@/i18n/routing";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import UserContextProvider from "@/entities/user/model/UserContext";
import { cookies } from "next/headers";
import { authServerApi } from "@/features/auth/api/auth.server";
import { ScrollProvider } from "@/shared/lib/context/ScrollContext";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import { apiServerService } from "@/shared/api/base.server";
import { IContacts, IContactsResponse } from "@/entities/company/model/types";
import SaveReferrer from "@/shared/config/saveReferrer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isUz = locale === "uz";

	const title = isUz
		? "O'zbekistonda farmatsevtika konsaltingi: Dori vositalarini ro'yxatdan o'tkazish, GxP auditi va Ta'lim"
		: "Фарм консалтинг в Узбекистане: Регистрация ЛС, GxP аудит и Обучение";

	const description = isUz
		? "Toshkent va O'zbekistonda farmatsevtika kompaniyalari uchun kompleks konsalting. Dori vositalari va BFQni ro'yxatdan o'tkazish, GMP/GDP standartlarini joriy etish, xodimlarni o'qitish va inspeksiyalarga tayyorgarlik."
		: "Комплексный консалтинг для фармацевтических компаний в Ташкенте и РУз. Регистрация лекарств и БАД, внедрение стандартов GMP/GDP, обучение персонала и подготовка к инспекциям.";

	const ogTitle = isUz
		? "O'zbekistonda farmatsevtika konsaltingi va ta'limi – Sizning kompaniyangiz"
		: "Фарм консалтинг и обучение в Узбекистане – Ваша компания";

	const ogDescription = isUz
		? "Farmatsevtika biznesini rivojlantirishga yordam beramiz: preparatlarni ro'yxatdan o'tkazishdan tortib GxP joriy etish va xodimlarni o'qitishgacha. Toshkentda professional yordam."
		: "Помогаем фармбизнесу расти: от регистрации препаратов до внедрения GxP и обучения сотрудников. Профессиональная поддержка в Ташкенте.";

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"),
		title,
		description,
		openGraph: {
			title: ogTitle,
			description: ogDescription,
			url: "https://pharmadvisor.uz",
			locale: isUz ? "uz_UZ" : "ru_RU",
			type: "website",
		},
	};
}

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");
	const user = await authServerApi.getUser(accessToken?.value);
	const { locale } = await params;
	if (!routing.locales.includes(locale as "ru" | "uz")) {
		notFound();
	}
	const messages = await getMessages();

	const contacts = await apiServerService().get<IContactsResponse>({ endpoint: "contacts", locale });

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<SaveReferrer />
				<ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={true} />
				<NextTopLoader
					color="#ffffff"
					initialPosition={0.08}
					crawlSpeed={200}
					height={2}
					showSpinner={false}
					shadow="0 0 10px #fff,0 0 5px #fff"
				/>
				<div className="wrapper">
					<NextIntlClientProvider messages={messages}>
						<UserContextProvider initialMe={user}>
							<ScrollProvider>
								<Header contacts={contacts?.data} />
								<main>{children}</main>
								<Footer contacts={contacts?.data} />
							</ScrollProvider>
						</UserContextProvider>
					</NextIntlClientProvider>
				</div>
			</body>
		</html>
	);
}
