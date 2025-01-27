"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

export default function CartPage() {
	const { cart, handleRemoveFromCart, handleIncrement, handleDecrement } =
		useContext(AuthContext);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true); // Set to true after the first render on the client
	}, []);

	if (!isClient) {
		return null; // Prevent rendering until after client-side hydration
	}

	const handleTotal = () => {
		return cart.reduce((total, item) => {
			const discountedPrice = (
				item.product.price *
				(1 - item.product.discountPercentage / 100)
			).toFixed(2);
			return total + parseFloat(discountedPrice) * item.quantity;
		}, 0);
	};

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-2xl font-bold mb-6">Your Cart</h1>

			{cart.length === 0 ? (
				<div className="text-center">
					<p>Your cart is empty!</p>
					<Link href="/products">
						<span className="text-emerald-600 hover:text-emerald-800">
							Browse products
						</span>
					</Link>
				</div>
			) : (
				<div>
					<div className="flex flex-col gap-4">
						{cart.map((item) => {
							const discountedPrice = (
								item.product.price *
								(1 - item.product.discountPercentage / 100)
							).toFixed(2);

							return (
								<div
									key={item.id}
									className="flex justify-between items-center p-4 border-b"
								>
									<div className="flex items-center gap-4">
										<Image
											src={item.product.thumbnail}
											alt={item.product.title}
											className="w-16 h-16 object-cover"
											width={50}
											height={50}
											priority
										/>
										<div>
											<h3 className="text-xl font-semibold">
												{item.product.title}
											</h3>
											<p className="text-sm text-gray-500">
												{/* Show discounted price if applicable */}
												$
												{item.product.discountPercentage
													? discountedPrice
													: item.product.price.toFixed(
															2
													  )}
												{item.product
													.discountPercentage && (
													<span className="line-through text-gray-500 ml-2">
														$
														{item.product.price.toFixed(
															2
														)}
													</span>
												)}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										{/* Decrement Button */}
										<button
											onClick={() =>
												handleDecrement(item.id)
											}
											className="border w-10 h-10 flex items-center justify-center rounded hover:bg-neutral-200"
										>
											<FaMinus />
										</button>

										{/* Quantity */}
										<span className="font-medium">
											{item.quantity}
										</span>

										{/* Increment Button */}
										<button
											onClick={() =>
												handleIncrement(item.id)
											}
											className="border w-10 h-10 flex items-center justify-center rounded hover:bg-neutral-200"
										>
											<FaPlus />
										</button>

										{/* Remove Button */}
										<button
											onClick={() =>
												handleRemoveFromCart(item.id)
											}
											className="hover:bg-rose-500 hover:text-black text-rose-500 h-10 w-10 flex items-center justify-center border rounded"
										>
											<FaTrash />
										</button>
									</div>
								</div>
							);
						})}
					</div>

					<div className="mt-6 flex justify-between items-center">
						<h2 className="text-xl font-semibold">
							Total: ${handleTotal().toFixed(2)}
						</h2>
						<Link href="/checkout">
							<span className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700">
								Checkout
							</span>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
