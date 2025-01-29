"use client";

import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

export default function RegisterPage() {
	const [userData, setUserData] = useState({ // state to store user data
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({ email: false, password: false }); // state to store errors

	const { user, handleRegister } = useContext(AuthContext); // context

	// handle form submission
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (userData.confirmPassword === userData.password) {
			setErrors(prev => ({...prev, password: false}));
			const newUser = { id: userData.email, cart: [], orderPlaced: [], ...userData };
			const res = handleRegister(newUser);

			if (!res) {
				setErrors((prev) => ({
					...prev,
					email: true,
				}));
			}
		} else {
			setErrors((prev) => ({
				...prev,
				password: true,
			}));
		}
	};

	// handle input change
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUserData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	// redirect to home page if user is logged in
	useEffect(() => {
		if (user?.email) redirect("/");
	}, [user]);

	return (
		<div className="container mx-auto">
			<div className="mt-10 max-w-xl mx-auto border p-10 rounded-2xl">
				<h1 className="text-3xl font-bold text-center">Register</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label htmlFor="name">Name</label>
						<input
							onChange={handleChange}
							className="border p-3 w-full"
							type="name"
							name="name"
							id="name"
							value={userData.name}
						/>
					</div>
					<div>
						<label
							className="flex items-center justify-between"
							htmlFor="email"
						>
							Email{" "}
							<span className="text-rose-500">
								{errors.email && "Email already exists"}
							</span>
						</label>
						<input
							onChange={handleChange}
							className={`border p-3 w-full ${
								errors.email && "border-rose-500"
							}`}
							type="email"
							name="email"
							id="email"
							value={userData.email}
						/>
					</div>
					<div>
						<label
							className="flex items-center justify-between"
							htmlFor="password"
						>
							Password{" "}
							<span className="text-rose-500">
								{errors.password && "Password does not match"}
							</span>
						</label>
						<input
							onChange={handleChange}
							className="border p-3 w-full"
							type="password"
							name="password"
							id="password"
							value={userData.password}
						/>
					</div>
					<div>
						<label
							className="flex items-center justify-between"
							htmlFor="confirmPassword"
						>
							Confirm Password
							<span className="text-rose-500">
								{errors.password && "Password does not match"}
							</span>
						</label>
						<input
							onChange={handleChange}
							className={`border p-3 w-full ${
								errors.password && "border-rose-500"
							}`}
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={userData.confirmPassword}
						/>
					</div>
					<button
						className="border py-3 bg-green-500 text-white font-medium hover:bg-green-600"
						type="submit"
					>
						Register
					</button>
				</form>
				<p className="text-center mt-4">
					Already have a account?{" "}
					<Link
						className="text-blue-600 hover:underline"
						href="/login"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
