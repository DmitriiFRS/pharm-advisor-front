import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLangSwitcher = () => {
	const router = useRouter();
	const pathName = usePathname();

	const currentLocale = pathName?.split("/")[1] || "ru";
	const switchLocale = useCallback(
		(newLocale: string) => {
			if (!pathName) return router.push("/");

			const segments = pathName.split("/");

			if (!segments[1] || /^[a-z]{2}$/.test(segments[1])) {
				segments[1] = newLocale;
			} else {
				segments.splice(1, 0, newLocale);
			}

			const newPath = segments.join("/");
			router.push(newPath);
		},
		[pathName, router]
	);

	return {
		currentLocale,
		switchLocale,
	};
};
