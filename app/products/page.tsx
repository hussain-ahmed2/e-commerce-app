"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SearchProducts from "@/components/SearchProducts";
import { ProductListContext } from "@/context/ProductListContext";
import { useContext } from "react";

export default function ProductListPage() {

    const {products, loading, error, activePage, setActivePage, total, limit} = useContext(ProductListContext);

    return (
		<div className="container mx-auto">
			<header className="bg-neutral-600 text-white py-6 text-center">
				<h1 className="text-3xl font-bold">All Products</h1>
				<p className="mt-2 text-lg">
					Browse through our extensive product list
				</p>
			</header>

			<div className="mt-6">
				<SearchProducts />
			</div>

			<section className="py-8 px-5">
				{loading ? (
					<Loader />
				) : error ? (
					<Error message="Error fetching products" />
				) : (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
						</div>
						<div className="py-6">
							<Pagination
								activePage={activePage}
								setActivePage={setActivePage}
								length={Math.ceil(total / limit)}
							/>
						</div>
					</>
				)}
			</section>
		</div>
	);
}