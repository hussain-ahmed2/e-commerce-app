"use client";

import { FaCheck, FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import { getProductById } from "@/services/api";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import { AuthContext } from "@/context/AuthContext";

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const { handleAddToCart, cart, handleIncrement, handleDecrement } = useContext(AuthContext);

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		const fetchProduct = async () => {
			try {
				const data = await getProductById(Number(id));
				setProduct(data);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) {
		return <Loader />;
	}

	if (error || !product) {
		return (
			<Error message="Something went wrong. Please try again later." />
		);
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Product Image and Thumbnail */}
				<div className="w-full md:w-1/2">
						<ImageCarousel images={product.images} />
				</div>

				{/* Product Details */}
				<div className="w-full md:w-1/2">
					<h1 className="text-2xl md:text-3xl font-semibold mb-4">
						{product.title}
					</h1>
					<p className="text-sm text-gray-500 mb-4">
						{product.category}
					</p>
					<p className="text-base md:text-lg mb-6">
						{product.description}
					</p>

					{/* Rating */}
					<div className="flex items-center mb-6">
						<div className="flex text-yellow-500">
							{Array.from({ length: 5 }, (_, index) => (
								<FaStar
									key={index}
									className={`${
										index < Math.floor(product.rating)
											? "fill-current"
											: "fill-transparent"
									}`}
								/>
							))}
						</div>
						<span className="ml-2 text-sm">
							{product.rating} / 5
						</span>
					</div>

					{/* Price and Discount */}
					<div className="text-xl md:text-2xl font-semibold text-green-600 mb-6 flex gap-4 items-center">
						<span>
							$
							{(
								product.price *
								(1 - product.discountPercentage / 100)
							).toFixed(2)}
						</span>
						<span className="text-sm text-gray-500 line-through">
							${product.price.toFixed(2)}
						</span>
					</div>

					{/* Stock Info */}
					<div className="mb-4">
						<span className="font-medium">Stock Status:</span>{" "}
						{product.availabilityStatus}
					</div>

					{/* Shipping Information */}
					<div className="mb-4">
						<span className="font-medium">
							Shipping Information:
						</span>{" "}
						{product.shippingInformation}
					</div>

					{/* Warranty */}
					<div className="mb-4">
						<span className="font-medium">Warranty:</span>{" "}
						{product.warrantyInformation}
					</div>

					{/* Add to Cart Button */}
					{
						cart.some((item) => item.product.id === product.id) ? (
							<div className="flex items-center gap-1">
								<button onClick={() => handleDecrement(product.id)} className="h-10 w-10 flex justify-center items-center hover:bg-neutral-200 border">
									<FaMinus />
								</button>
								<span className="h-10 w-10 flex justify-center items-center border">
									{cart.find((item) => item.product.id === product.id)?.quantity}
								</span>
								<button onClick={() => handleIncrement(product.id)} className="h-10 w-10 flex justify-center items-center hover:bg-neutral-200 border">
									<FaPlus />
								</button>
								<span className="text-green-600 flex items-center justify-center ms-4 gap-2"><FaCheck /> Added </span>
							</div>
						) : (
							<button
								className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
								onClick={() => handleAddToCart(product)}
							>
								Add to Cart
							</button>
						)
					}
				</div>
			</div>

			{/* Product Dimensions */}
			<div className="mt-12">
				<h2 className="text-2xl font-semibold mb-4">
					Product Dimensions
				</h2>
				<ul>
					<li>Width: {product.dimensions.width} cm</li>
					<li>Height: {product.dimensions.height} cm</li>
					<li>Depth: {product.dimensions.depth} cm</li>
				</ul>
			</div>

			{/* Reviews Section */}
			<div className="mt-12">
				<h2 className="text-2xl font-semibold mb-4">
					Customer Reviews
				</h2>
				{product.reviews.length > 0 ? (
					product.reviews.map((review, index) => (
						<div key={index} className="border-b pb-4 mb-4">
							<div className="flex items-center">
								<div className="flex text-yellow-500">
									{Array.from(
										{ length: 5 },
										(_, starIndex) => (
											<FaStar
												key={starIndex}
												className={`${
													starIndex <
													Math.floor(review.rating)
														? "fill-current"
														: "fill-transparent"
												}`}
											/>
										)
									)}
								</div>
								<span className="ml-2 text-sm text-gray-500">
									{review.date}
								</span>
							</div>
							<p className="text-sm">{review.comment}</p>
							<p className="text-xs text-gray-500">
								- {review.reviewerName}
							</p>
						</div>
					))
				) : (
					<p>No reviews yet.</p>
				)}
			</div>
		</div>
	);
}
