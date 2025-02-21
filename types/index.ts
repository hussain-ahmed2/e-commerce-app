import { Dispatch, SetStateAction } from "react";


export interface Review {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

export interface Meta {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: Meta;
	images: string[];
	thumbnail: string;
}

export interface HomeContextType {
	featuredProducts: Product[] | [];
	loading: boolean;
	error: boolean;
}

export interface ProductListContextType {
	products: Product[] | [];
	loading: boolean;
	error: boolean;
	limit: number;
	setLimit: Dispatch<SetStateAction<number>>;
	activePage: number;
	setActivePage: Dispatch<SetStateAction<number>>;
	total: number;
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
}

export interface PaginationPropsType {
	length: number;
	activePage: number;
	setActivePage: Dispatch<SetStateAction<number>>;
}

export interface Category {
	slug: string;
	name: string;
	url: string;
}

export interface CategoryContextType {
	categories: Category[] | [];
	categoriesLoading: boolean;
	categoriesError: boolean;
	products: Product[] | [];
	total: number;
	category: Category;
	setCategory: Dispatch<SetStateAction<Category>>;
	limit: number;
	setLimit: Dispatch<SetStateAction<number>>;
	activePage: number;
	setActivePage: Dispatch<SetStateAction<number>>;
	categoryLoading: boolean;
	categoryError: boolean;
}

export interface CategoriesSidebarPropsType {
	categories: Category[] | [];
	loading: boolean;
	error: boolean;
	selectedCategory: Category;
	setSelectedCategory: (category: Category) => void;
}	

export interface User {
	id: string | number;
	name: string;
	email: string;
	password: string;
	cart: Cart[];
	orderPlaced: Order[] | [];
}


export interface Order {
	id: string | number;
	userId: string | number;
	products: Product[];
	total: number;
	status: string;
}

export interface AuthContextType {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	handleRegister: (user: User) => boolean;
	handleLogin: (email: string, password: string) => { email: boolean; password: boolean };
	handleLogout: () => void;
	cart: Cart[] | [];
	setCart: Dispatch<SetStateAction<Cart[] | []>>;
	handleAddToCart: (product: Product) => void;
	handleRemoveFromCart: (id: number) => void;
	handleIncrement: (id: number) => void;
	handleDecrement: (id: number) => void;
	handleUserDataUpdate: (name: string, email: string) => void;
	handlePlaceOrder: () => void;
	handleTotal: () => number;
	orderPlaced: Order[];
}

export interface Cart {
	id: number;
	quantity: number;
	product: Product;
}