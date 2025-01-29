"use client";

import CategoriesSidebar from "@/components/CategoriesSidebar";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";
import { CategoryContext } from "@/context/CategoryContext";
import { useContext } from "react";

export default function CategoriesListPage() {
    const { categories, category, setCategory, categoriesLoading, categoriesError, products, total, limit, activePage, setActivePage, categoryError, categoryLoading } = useContext(CategoryContext);
    return (
		<div className="container mx-auto">
			<header className="bg-neutral-600 text-white py-6 text-center">
				<h1 className="text-3xl font-bold">Product Categories</h1>
				<p className="mt-2 text-lg">Explore products by category</p>
			</header>

			<div className="flex flex-col md:flex-row">
				{/* This section renders the categories sidebar */}
				<div className="w-full min-h-14 md:w-1/4 relative z-10">
					<CategoriesSidebar
						categories={categories}
						selectedCategory={category}
						setSelectedCategory={setCategory}
						loading={categoriesLoading}
						error={categoriesError}
					/>
				</div>

				{/* This section renders the products grid */}
				<main className="md:w-3/4 bg-white p-4">
					{categoryLoading ? (
						<Loader />
					) : categoryError ? (
						<Error message="Error fetching products" />
					) : (
						<>
							<h2 className="text-xl font-bold mb-4">
								{category?.name} Products
							</h2>
							<div className="w-full h-full flex flex-col justify-between pb-6">
								<ProductGrid products={products} />
								{/* This section renders the pagination */}
								<div className="py-6">
									<Pagination
										activePage={activePage}
										setActivePage={setActivePage}
										length={Math.ceil(total / limit)}
									/>
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}