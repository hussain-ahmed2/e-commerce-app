import axios from "axios";

// Base URL for the API
export const BASE_URL = "https://dummyjson.com/products";

// Get products from the API
export async function getProducts(limit: number = 10, skip: number = 0) {
	const { data } = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
	return data;
}

// Get a single product by ID from the API
export async function getProductById(id: string) {
	const { data } = await axios.get(`${BASE_URL}/${id}`);
	return data;
}

// Get products by category from the API
export async function getProductsByCategory(
	category: string,
	limit: number = 10,
	skip: number = 0
) {
	const { data } = await axios.get(
		`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
	);
	return data;
}

// Get products by search query from the API
export async function getProductsBySearch(
	query: string,
	limit: number = 10,
	skip: number = 0
) {
	const { data } = await axios.get(
		`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`
	);
	return data;
}

// Get categories from the API
export async function getCategories() {
	const { data } = await axios.get(`${BASE_URL}/categories`);
	return data;
}
