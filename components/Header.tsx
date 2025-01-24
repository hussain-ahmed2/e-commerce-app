import Link from "next/link";

export default function Header() {
	return (
		<header className="fixed w-full border-b p-3 bg-emerald-600 text-white z-50">
			<nav className="container mx-auto max-w-7xl flex justify-between items-center">
				<h1 className="text-2xl font-bold">My Store</h1>
				<div className="space-x-8">
                    <Link href="/">
                        Home 
                    </Link>
                    <Link href="/products">
                        Products
                    </Link>
                    <Link href='/products/categories'>
                        Categories
                    </Link>
                </div>
			</nav>
		</header>
	);
}
