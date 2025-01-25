import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import App from "@/components/App";

const karlaSans = Karla({
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
			<body className={`${karlaSans.className} antialiased`}>
				<App>{children}</App>
			</body>
		</html>
	);
}
