import { TELEGRAM_URL_API } from "@/shared/config/telegram";

export async function POST(request: Request) {
	const data = await request.json();
	const message = `Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\nСообщение: ${data.message}`;
	const res = await fetch(TELEGRAM_URL_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
			text: message,
		}),
	});
	if (!res.ok) {
		throw new Error("Failed to send feedback");
	}
	//
	return Response.json({ data });
}
