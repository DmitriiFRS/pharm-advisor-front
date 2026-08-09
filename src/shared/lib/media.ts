export const getMediaUrl = (path?: string | null): string | null => {
	if (!path) return null;
	if (/^https?:\/\//i.test(path)) return path;

	const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
	if (!mediaBaseUrl) return null;

	return `${mediaBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
