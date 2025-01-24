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

