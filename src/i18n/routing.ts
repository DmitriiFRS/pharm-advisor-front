import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
	locales: ["ru", "uz"], // Define in this line the possible languages for translation
	defaultLocale: "ru", // Define in this line the default language to be shown
	localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
//
