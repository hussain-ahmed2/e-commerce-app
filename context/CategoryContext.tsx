import { getCategories, getProductsByCategory } from "@/services/api";
import { Category, CategoryContextType, Product } from "@/types";
import { useEffect, useState, createContext } from "react";

export const CategoryContext = createContext<CategoryContextType>(
	{} as CategoryContextType
);

export function CategoryProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [category, setCategory] = useState<Category>({ slug: "", name: "", url: "" }); // Selected category
	const [categories, setCategories] = useState<Category[] | []>([]); // All categories
	const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false); // Loading state
	const [categoryLoading, setCategoryLoading] = useState<boolean>(false); // Loading state
	const [categoriesError, setCategoriesError] = useState<boolean>(false); // Error state
	const [categoryError, setCategoryError] = useState<boolean>(false); // Error state
	const [products, setProducts] = useState<Product[] | []>([]); // Products
	const [total, setTotal] = useState<number>(0); // Total
	const [limit, setLimit] = useState<number>(20); // Limit
	const [activePage, setActivePage] = useState<number>(1); // Active page

	// Fetch categories
	useEffect(() => {
		setCategoriesLoading(true);
		const fetchCategories = async () => {
			try {
				const categories = await getCategories();
				setCategories(categories);
				setCategory(categories[0]);
			} catch (error) {
				console.log(error);
				setCategoriesError(true);
			} finally {
				setCategoriesLoading(false);
			}
		};
		fetchCategories();
	}, []);

	// Fetch products
	useEffect(() => {
		setCategoryLoading(true);
		const fetchProducts = async () => {
			try {
				const data = await getProductsByCategory(
					category?.slug || "beauty",
					limit,
					(activePage - 1) * limit
				);
				setProducts(data.products);
				setTotal(data.total);
			} catch (error) {
				console.log(error);
				setCategoryError(true);
			} finally {
				setCategoryLoading(false);
			}
		};
		fetchProducts();
	}, [category, activePage, limit]);
	return (
		<CategoryContext.Provider
			value={{
				categories,
				categoriesLoading,
				categoriesError,
				category,
				setCategory,
				products,
				total,
				limit,
				setLimit,
				activePage,
				setActivePage,
				categoryLoading,
				categoryError,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
}
