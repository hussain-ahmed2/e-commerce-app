import { Dispatch, SetStateAction } from "react";

export interface Product {
	availabilityStatus: string;
	brand: string;
	category: string;
	description: string;
	dimensions: {
		depth: number;
		height: number;
		width: number;
	};

	discountPercentage: number;
	id: number;
	images: string[];
	meta: {
		barcode: string;
		createdAt: string;
		qrCode: string;
		updatedAt: string;
	};

	minimumOrderQuantity: number;
	price: number;
	rating: number;
	returnPolicy: string;
	reviews: {
		rating: number;
		comment: string;
		reviewerName: string;
		date: string;
		reviewerEmail: string;
	}[];
	shippingInformation: string;
	sku: string;
	stock: number;
	tags: string[];
	thumbnail: string;
	title: string;
	warrantyInformation: string;
	weight: number;
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
}

export interface PaginationPropsType {
	length: number;
	activePage: number;
	setActivePage: Dispatch<SetStateAction<number>>;
}
