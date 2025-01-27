import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

export default function Header() {
	const { user } = useContext(AuthContext);
	const [isMounted, setIsMounted] = useState(false);

	// Ensure this component behaves the same during SSR and CSR
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<header className="fixed w-full border-b p-3 bg-emerald-600 text-white z-50">
			<nav className="container mx-auto max-w-7xl flex justify-between items-center">
				<h1 className="text-2xl font-bold">My Store</h1>
				<div className="flex items-center justify-center gap-8">
					<Link href="/">Home</Link>
					<Link href="/products">Products</Link>
					<Link href="/products/categories">Categories</Link>
					<Link href="/cart">Cart</Link>
					{isMounted ? (
						<Link href={`${user?.id ? "/user" : "/login"}`}>
							{user?.id ? (
								<FaUser className="border rounded-full text-3xl p-1 hover:bg-white hover:text-emerald-600" />
							) : (
								"Login"
							)}
						</Link>
					) : (
						<span>Loading...</span> // Placeholder during hydration
					)}
				</div>
			</nav>
		</header>
	);
}
