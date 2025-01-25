"use client";

import { HomeProvider } from "@/context/HomeContext";
import { ReactNode } from "react";

export default function App({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<HomeProvider>
			<main className="max-w-7xl min-h-[calc(100vh-3.1rem)] mx-auto pt-16">
				{children}
			</main>
		</HomeProvider>
	);
}