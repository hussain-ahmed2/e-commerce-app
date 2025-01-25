import { getProducts } from "@/services/api";
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

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const data = await getProducts(limit, (activePage - 1) * limit);
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
	}, [activePage, limit]);

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
				total
			}}
		>
			{children}
		</ProductListContext.Provider>
	);
}
