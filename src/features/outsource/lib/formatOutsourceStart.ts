const OUTSOURCE_TIME_ZONE = "Asia/Tashkent";

export interface FormattedOutsourceStart {
	date: string;
	time: string;
	iso: string;
}

export const formatOutsourceStart = (startsAt: string, locale: string): FormattedOutsourceStart | null => {
	const date = new Date(startsAt);
	if (Number.isNaN(date.getTime())) return null;

	const localeTag = locale === "uz" ? "uz-UZ" : "ru-RU";
	const dateFormatter = new Intl.DateTimeFormat(localeTag, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: OUTSOURCE_TIME_ZONE,
	});
	const timeFormatter = new Intl.DateTimeFormat(localeTag, {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: OUTSOURCE_TIME_ZONE,
	});

	return {
		date: dateFormatter.format(date),
		time: timeFormatter.format(date),
		iso: date.toISOString(),
	};
};
