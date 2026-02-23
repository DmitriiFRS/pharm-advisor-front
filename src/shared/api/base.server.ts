import "server-only";

export const apiServerService = (accessToken?: string) => {
	return {
		get: async <T>({
			endpoint,
			queryParams,
			locale = "ru",
		}: {
			endpoint: string;
			queryParams?: Record<string, string | number | undefined>;
			locale?: string;
		}): Promise<T | null> => {
			const params = new URLSearchParams();
			Object.entries(queryParams || {}).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					params.append(key, String(value));
				}
			});
			const queryString = params.toString();
			const fullEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?${queryString}`;
			try {
				const response = await fetch(fullEndpoint, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						...(accessToken && { Authorization: `Bearer ${accessToken}` }),
						"accept-language": locale,
					},
					cache: "no-store",
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return await response.json();
			} catch (err) {
				console.error(err);
				return null;
			}
		},

		post: async <T>({ entity, data }: { entity: string; data: T }) => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${entity}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return await response.json();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
	};
};
