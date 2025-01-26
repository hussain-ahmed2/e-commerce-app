"use client";

import { HomeProvider } from "@/context/HomeContext";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ProductListProvider } from "@/context/ProductListContext";
import { CategoryProvider } from "@/context/CategoryContext";

export default function App({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<CategoryProvider>
			<ProductListProvider>
				<HomeProvider>
					<Header />
					<main className="max-w-7xl min-h-[calc(100vh-3.1rem)] mx-auto pt-16">
						{children}
					</main>
					<Footer />
				</HomeProvider>
			</ProductListProvider>
		</CategoryProvider>
	);
}