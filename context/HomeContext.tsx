import { getProducts } from "@/services/api";
import { HomeContextType, Product } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const HomeContext = createContext<HomeContextType>(
	{} as HomeContextType
);

export function HomeProvider({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [featuredProducts, setFeaturedProducts] = useState<Product[] | []>( // Featured products
		[]
	);
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [error, setError] = useState<boolean>(false); // Error state

	// Fetch featured products
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
