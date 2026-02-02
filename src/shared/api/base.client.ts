export const apiClientService = () => {
	return {
		get: async <T>({
			entity,
			params,
		}: {
			entity: string;
			params?: Record<string, string | number | undefined | string[]>;
		}): Promise<T> => {
			try {
				const searchParams = new URLSearchParams();
				if (params) {
					Object.entries(params).forEach(([key, value]) => {
						if (value === undefined) return;
						if (Array.isArray(value)) {
							value.forEach((v) => searchParams.append(key, v));
						} else {
							searchParams.append(key, String(value));
						}
					});
				}
				const response = await fetch(`/api/get/${entity}?${searchParams.toString()}`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						Array.isArray(errorData.message) ? errorData.message[0] : errorData.message || `HTTP error! status: ${response.status}`
					);
				}
				return await response.json();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},

		post: async <T>({
			entity,
			data,
			headers = { "Content-Type": "application/json" },
		}: {
			entity: string;
			data: T;
			headers?: Record<string, string>;
		}) => {
			try {
				const response = await fetch(`/api/post/${entity}`, {
					method: "POST",
					headers,
					body: JSON.stringify(data),
				});
				if (!response.ok) {
					const errorData = await response.json();
					console.log("errorData in client", errorData.error);
					throw new Error(
						Array.isArray(errorData.error) ? errorData.error[0] : errorData.error || `HTTP error! status: ${response.status}`
					);
				}
				return await response.json();
			} catch (err) {
				console.error(err);
				throw err;
			}
		},
	};
};
