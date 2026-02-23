export const TELEGRAM_URL_API = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_BOT_TOKEN}/sendMessage`;

export function telegramMessage(data: {
	name: string;
	phone: string;
	email: string;
	message: string;
	pathname: string;
	referrer: string;
	siteSection: string;
}) {
	return `
Имя: ${data.name || "Не указано"}
Телефон: ${data.phone || "Не указано"}
Email: ${data.email || "Не указано"}
Сообщение: ${data.message || "Не указано"}
Страница сайта: ${data.pathname || "Неизвестно"}
Секция: ${data.siteSection || "Неизвестно"}
Реферер: ${data.referrer || "Неизвестно"}`;
}
