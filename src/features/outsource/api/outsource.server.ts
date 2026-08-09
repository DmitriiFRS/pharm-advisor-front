import "server-only";

import { cache } from "react";

import { apiServerService } from "@/shared/api/base.server";

import type { OutsourceFaqResponse, OutsourcePageResponse } from "../types/outsource.types";
import { OUTSOURCE_ENDPOINTS } from "./outsource.endpoints";

export const getOutsourcePage = cache((locale: string) =>
	apiServerService().getStrict<OutsourcePageResponse>({
		endpoint: OUTSOURCE_ENDPOINTS.PAGE,
		locale,
	})
);

export const getOutsourceFaqs = (locale: string) =>
	apiServerService().getStrict<OutsourceFaqResponse>({
		endpoint: OUTSOURCE_ENDPOINTS.FAQS,
		queryParams: { page: 1, limit: 100 },
		locale,
	});
