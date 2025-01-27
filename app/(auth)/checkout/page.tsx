"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FaCreditCard } from "react-icons/fa6";
import Image from "next/image";

const CheckoutPage = () => {
	const { cart, handleTotal, handlePlaceOrder } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);

	if (cart.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-2xl font-bold mb-6">Checkout</h1>
				<div className="text-center">
					<p>Your cart is empty!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-2xl font-bold mb-6">Checkout</h1>

			{cart.length === 0 ? (
				<div className="text-center">
					<p>Your cart is empty!</p>
				</div>
			) : (
				<div>
					<div className="flex flex-col gap-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center p-4 border-b"
							>
								<div className="flex items-center gap-4">
									<Image
										src={item.product.thumbnail}
										alt={item.product.title}
										className="w-16 h-16 object-cover"
										width={64}
										height={64}
										priority
									/>
									<div>
										<h2 className="font-semibold">
											{item.product.title}
										</h2>
										<p>Quantity: {item.quantity}</p>
									</div>
								</div>
								<p className="text-lg font-bold">
									$
									{(
										item.product.price *
										(1 -
											item.product.discountPercentage /
												100)
									).toFixed(2)}
								</p>
							</div>
						))}
					</div>

					<div className="flex justify-between items-center mt-6">
						<h2 className="text-xl font-bold">Total</h2>
						<p className="text-xl font-bold">
							${handleTotal().toFixed(2)}
						</p>
					</div>

					<>
						<button
							onClick={() => setShowModal(true)}
							className="mt-6 w-full text-white bg-emerald-600 hover:bg-emerald-800 p-3 rounded-md flex items-center justify-center gap-2"
						>
							<FaCreditCard />
							<span>Proceed to Payment</span>
						</button>

						{showModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
								<div className="bg-white p-6 rounded-md shadow-md w-96">
									<h2 className="text-xl font-bold mb-4">
										Payment Information
									</h2>
									{/* Payment form fields here */}
									<div>
										<input
											type="text"
											placeholder="Card Number"
											className="w-full p-3 border rounded-md mb-3"
										/>
										<input
											type="text"
											placeholder="Cardholder Name"
											className="w-full p-3 border rounded-md mb-3"
										/>
										<div className="flex gap-3">
											<input
												type="text"
												placeholder="Expiry Date (MM/YY)"
												className="w-1/2 p-3 border rounded-md mb-3"
											/>
											<input
												type="text"
												placeholder="CVC"
												className="w-1/2 p-3 border rounded-md mb-3"
											/>
										</div>
									</div>
									<button
										onClick={() => {
											alert(
												"Payment submitted successfully!"
											);
											setShowModal(false);
                                            handlePlaceOrder();
										}}
										className="mt-4 w-full text-white bg-emerald-600 hover:bg-emerald-800 p-3 rounded-md"
									>
										Submit Payment
									</button>
								</div>
							</div>
						)}
					</>
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;
