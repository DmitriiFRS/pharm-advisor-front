import { useCallback, useEffect, useState } from "react";

interface UseDataResponse<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

export function useData<T>(
	entityPath: string,
	queryParams?: Record<string, string | number | undefined>,
	locale?: string
): UseDataResponse<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		let fullEndpoint = `/api/get/${entityPath}`;
		if (queryParams) {
			const params = new URLSearchParams();
			Object.entries(queryParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					params.append(key, String(value));
				}
			});
			const queryString = params.toString();
			if (queryString) {
				fullEndpoint += `?${queryString}`;
			}
		}
		try {
			const response = await fetch(fullEndpoint, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					...(locale && { "accept-language": locale }),
					// "accept-language": "ru",
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const jsonData = await response.json();
			setData(jsonData);
		} catch (err: unknown) {
			const errorObj = err instanceof Error ? err : new Error("Unknown error occurred");
			setError(errorObj);
			console.error("Failed to fetch data:", errorObj);
		} finally {
			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [entityPath, JSON.stringify(queryParams)]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch: fetchData };
}
