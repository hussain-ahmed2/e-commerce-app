import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaBars, FaUser } from "react-icons/fa6";

export default function Header() {
	const { user, handleLogout } = useContext(AuthContext);
	const [isMounted, setIsMounted] = useState(false);
	const [open, setOpen] = useState(false);

	const handleNavClose = () => {
		setOpen(false);
	}

	const handleNavToggle = () => {
		setOpen(prev => !prev);
	}

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<header className="fixed w-full border-b p-3 bg-emerald-600 text-white z-50">
			<nav className="container mx-auto max-w-7xl flex justify-between items-center max-md:overflow-hidden">
				<h1 className="text-2xl font-bold">My Store</h1>
				<button
					onClick={handleNavToggle}
					className="md:hidden text-2xl"
				>
					<FaBars />
				</button>
				<div
					className={`flex md:items-center md:justify-center md:gap-8 max-md:flex-col max-md:absolute max-md:bg-green-600 max-md:w-full max-md:top-14 max-md:left-0 max-md:py-10 max-md:*:py-3 text-center transform transition ${open ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}
				>
					<Link onClick={handleNavClose} className="max-md:hover:bg-green-700" href="/">Home</Link>
					<Link onClick={handleNavClose} className="max-md:hover:bg-green-700" href="/products">Products</Link>
					<Link onClick={handleNavClose} className="max-md:hover:bg-green-700" href="/products/categories">Categories</Link>
					<Link onClick={handleNavClose} className="max-md:hover:bg-green-700" href="/cart">Cart</Link>
					{isMounted ? (
						<Link onClick={handleNavClose} className="max-md:hover:bg-green-700 self-center" href={`${user?.id ? "/user" : "/login"}`}>
							{user?.id ? (
								<div className="border rounded-full text-3xl p-1 hover:bg-white hover:text-emerald-600 relative group">
									<FaUser className="p-1" />
									<div className="hidden group-hover:block absolute right-0 p-2 bg-white rounded-md shadow-lg">
										<p className="text-sm block w-max text-black">
											User: {user?.name}
										</p>
										<button
											onClick={event => {
												event.stopPropagation();
												handleLogout();
											}}
											className="text-sm text-emerald-600 hover:text-emerald-700"
										>
											Logout
										</button>
									</div>
								</div>
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
