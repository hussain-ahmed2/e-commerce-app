import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const karlaSans = Karla({
	variable: "--font-karla",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "My Store",
	description: "A simple store",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${karlaSans.variable} antialiased`}>
				<Header />
				<main className="max-w-7xl min-h-[calc(100vh-3.1rem)] mx-auto">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
