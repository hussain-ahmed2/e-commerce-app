import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import App from "@/components/App";

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
				<App>
					{ children }
				</App>
				<Footer />
			</body>
		</html>
	);
}
