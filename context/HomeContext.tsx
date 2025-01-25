import { getProducts } from "@/services/api";
import { HomeContextType, Product } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const HomeContext = createContext<HomeContextType>(
	{} as HomeContextType
);

export function HomeProvider({ children }: { children: ReactNode }) {
	const [featuredProducts, setFeaturedProducts] = useState<Product[] | []>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const data = await getProducts(8);
				setFeaturedProducts(data.products);
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
		<HomeContext.Provider value={{ featuredProducts, loading, error }}>
			{children}
		</HomeContext.Provider>
	);
}
