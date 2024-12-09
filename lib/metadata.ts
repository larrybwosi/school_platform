import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://schedule.vercel.app/",
			images: "https://schedule.vercel.app/",
			siteName: "Clevery",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@rodneybwosi",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "https://schedule.vercel.app/",
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL!}`);