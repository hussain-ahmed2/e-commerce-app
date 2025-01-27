"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

export default function LoginPage() {
    const [userData, setUserData] = useState({email: '', password: ''});
	const [errors, setErrors] = useState({ email: false, password: false });
    const { handleLogin, user } = useContext(AuthContext);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const status = handleLogin(userData.email, userData.password);

		if (status.email) setErrors(prev => ({...prev, email: true}));
		if (status.password) setErrors(prev => ({...prev, password: true}));
		if(!status.email && !status.password) redirect('/user');
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    useEffect(() => {
        if (user?.email) redirect('/');
    }, [user])

	return (
		<div className="container mx-auto">
			<div className="mt-10 max-w-xl mx-auto border p-10 rounded-2xl">
				<h1 className="text-3xl font-bold text-center">Login</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label className="flex items-center justify-between" htmlFor="email">Email <span className="text-red-500">{errors.email && 'email is not registered'}</span></label>
						<input
							onChange={handleChange}
							className="border p-3 w-full"
							type="email"
							name="email"
							id="email"
							value={userData.email}
						/>
					</div>
					<div>
						<label className="flex items-center justify-between" htmlFor="password">Password <span className="text-red-500">{errors.password && 'password is incorrect'}</span></label>
						<input
							onChange={handleChange}
							className="border p-3 w-full"
							type="password"
							name="password"
							id="password"
							value={userData.password}
						/>
					</div>
					<button
						className="border py-3 bg-green-500 text-white font-medium hover:bg-green-600"
						type="submit"
					>
						Login
					</button>
				</form>
				<p className="text-center mt-4">
					Don{"'"}t have any account?{" "}
					<Link
						className="text-blue-600 hover:underline"
						href="/register"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
