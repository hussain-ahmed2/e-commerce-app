import useDebounce from "@/hooks/useDebounce";
import { getProducts, getProductsBySearch } from "@/services/api";
import { Product, ProductListContextType } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const ProductListContext = createContext<ProductListContextType>(
	{} as ProductListContextType
);

export function ProductListProvider({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [products, setProducts] = useState<Product[] | []>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [activePage, setActivePage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(20);
	const [total, setTotal] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState<string>("");

	// Debounce the search term to reduce API calls
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			let data = [];
			try {
				if (debouncedSearchTerm) {
					data = await getProductsBySearch(debouncedSearchTerm, limit, (activePage - 1) * limit);
				} else {
					data = await getProducts(limit, (activePage - 1) * limit);
				}
				setProducts(data.products);
				setTotal(data.total);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [activePage, limit, debouncedSearchTerm]);

	return (
		<ProductListContext.Provider
			value={{
				products,
				loading,
				error,
				limit,
				setLimit,
				activePage,
				setActivePage,
				total,
				searchTerm,
				setSearchTerm,
			}}
		>
			{children}
		</ProductListContext.Provider>
	);
}
