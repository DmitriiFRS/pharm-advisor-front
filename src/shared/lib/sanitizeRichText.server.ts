import "server-only";

import sanitizeHtml from "sanitize-html";

const RICH_TEXT_TAGS = [
	"p",
	"br",
	"strong",
	"b",
	"em",
	"i",
	"u",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"blockquote",
	"ul",
	"ol",
	"li",
	"a",
] as const;

export const sanitizeRichText = (html: string): string =>
	sanitizeHtml(html, {
		allowedTags: [...RICH_TEXT_TAGS],
		allowedAttributes: {
			a: ["href", "target", "rel"],
		},
		allowedSchemes: ["http", "https", "mailto", "tel"],
		transformTags: {
			a: (_tagName, attribs) => ({
				tagName: "a",
				attribs: {
					...attribs,
					rel: "noopener noreferrer",
				},
			}),
		},
	})
		.replace(/&nbsp;/gi, " ")
		.replace(/\u00a0/g, " ");
