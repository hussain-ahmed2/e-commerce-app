"use client";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/api";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
	const [products, setProducts] = useState<Product[] | []>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const data = await getProducts(8);
				setProducts(data.products);
			} catch (error) {
        console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	return (
		<div className="container mx-auto max-w-7xl">
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
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
