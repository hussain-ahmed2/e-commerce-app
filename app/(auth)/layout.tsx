"use client";
import { useEffect, useState } from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true); // Set client-side flag after the first render
	}, []);
	if (!isClient) return null; // Skip SSR render until after hydration
	return <>{children}</>;
}
