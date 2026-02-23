"use client";

import { useEffect } from "react";

export default function SaveReferrer() {
	useEffect(() => {
		if (document?.referrer) {
			sessionStorage.setItem("referrer", document.referrer);
		}

		if (location.href && location.href.includes("utm_source")) {
			sessionStorage.setItem("utm", location.href);
		}
	}, []);

	return null;
}
