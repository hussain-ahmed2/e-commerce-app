"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function UserPage() {
	const { user, cart, orderPlaced } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [showOrders, setShowOrders] = useState(false);

	const handleSave = () => {
		// Update user details in context (you can implement a more complex update logic here)
        
		console.log("Saving user details...", { name, email });
		setIsEditing(false);
	};

	return (
		<div className="container mx-auto p-8">
			<div className="flex items-center gap-4">
				<FaUserCircle className="text-4xl text-emerald-600" />
				<h1 className="text-2xl font-semibold">User Profile</h1>
			</div>

			<div className="mt-6">
				<button
					onClick={() => setShowOrders((prev) => !prev)}
					className="px-4 py-2 bg-emerald-600 text-white rounded-md"
				>
					Show Orders
				</button>

				{showOrders && (
					<div className="mt-4">
						<h2 className="text-xl font-semibold">Order History</h2>
						<div className="flex flex-col gap-4">
							{orderPlaced.map((order) => (
								<div
									key={order.id}
									className="border p-4 rounded-md"
								>
									<p>
										<strong>Order ID:</strong> {order.id}
									</p>
									<p>
										<strong>Total:</strong> ${order.total}
									</p>
									<p>
										<strong>Status:</strong> {order.status}
									</p>
									{/* Add more order details if needed */}
								</div>
							))}
						</div>
					</div>
				)}
			</div>


			{user ? (
				<div className="mt-6">
					<div className="flex flex-col gap-4">
						{/* User Info */}
						<div>
							<label className="block text-lg font-semibold">
								Name:
							</label>
							{isEditing ? (
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							) : (
								<p>{name}</p>
							)}
						</div>

						<div>
							<label className="block text-lg font-semibold">
								Email:
							</label>
							{isEditing ? (
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full p-2 border rounded-md"
								/>
							) : (
								<p>{email}</p>
							)}
						</div>

						{/* Edit/Save Button */}
						<div className="mt-4">
							{isEditing ? (
								<button
									onClick={handleSave}
									className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700"
								>
									Save Changes
								</button>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className="bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400"
								>
									Edit Profile
								</button>
							)}
						</div>
					</div>

					{/* User's Cart */}
					<div className="mt-6">
						<h2 className="text-xl font-semibold">Your Cart</h2>

						{cart.length === 0 ? (
							<p>Your cart is empty!</p>
						) : (
							<div>
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
												width={50}
												height={50}
												priority
											/>
											<div>
												<h3 className="text-lg font-semibold">
													{item.product.title}
												</h3>
												<p className="text-sm text-gray-500">
													$
													{item.product.price.toFixed(
														2
													)}{" "}
													× {item.quantity}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Link to Checkout */}
					{cart.length > 0 && (
						<div className="mt-6 flex justify-between items-center">
							<Link href="/checkout">
								<span className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700">
									Proceed to Checkout
								</span>
							</Link>
						</div>
					)}
				</div>
			) : (
				<div className="mt-6">
					<p>Please log in to view your profile.</p>
					<Link href="/login">
						<span className="text-emerald-600 hover:text-emerald-800">
							Login here
						</span>
					</Link>
				</div>
			)}
		</div>
	);
}
