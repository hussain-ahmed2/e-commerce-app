"use client";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import ProductGrid from "@/components/ProductGrid";
import { HomeContext } from "@/context/HomeContext";
import { useContext } from "react";

export default function Home() {
	const {featuredProducts, loading, error} = useContext(HomeContext);

	return (
		<div className="container mx-auto">
			<header className="bg-neutral-600 text-white py-6 text-center">
				<h1 className="text-4xl font-bold">
					Welcome to Our E-Commerce Store
				</h1>
				<p className="mt-2 text-lg">
					Find the best products at unbeatable prices
				</p>
			</header>

			<section className="py-8 px-5">
				<h2 className="text-2xl font-bold mb-4">Featured Products</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<Error message="Error Getting Products Data Please Refresh Your Browser." />
				) : (
					<ProductGrid products={featuredProducts} />
				)}
			</section>

			<section className="bg-gray-100 py-8 px-5">
				<h2 className="text-2xl font-bold text-center mb-4">
					Why Shop With Us?
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
					<div className="p-4 shadow-md rounded bg-white">
						<h3 className="text-xl font-semibold mb-2">
							Quality Products
						</h3>
						<p>
							We provide only the best quality products from
							trusted brands.
						</p>
					</div>
					<div className="p-4 shadow-md rounded bg-white">
						<h3 className="text-xl font-semibold mb-2">
							Fast Shipping
						</h3>
						<p>
							Get your products delivered quickly and safely to
							your doorstep.
						</p>
					</div>
					<div className="p-4 shadow-md rounded bg-white">
						<h3 className="text-xl font-semibold mb-2">
							24/7 Support
						</h3>
						<p>
							Our team is here to assist you with any inquiries at
							any time.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
