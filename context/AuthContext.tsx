import { AuthContextType, Cart, Order, Product, User } from "@/types";
import { redirect } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [users, setUsers] = useState<User[]>(() => {
		try {
			return JSON.parse(localStorage.getItem("users") || "[]") as User[];
		} catch {
			return [];
		}
	});

	const [user, setUser] = useState<User | null>(() => {
		try {
			const storedUser = localStorage.getItem("user");
			return storedUser ? (JSON.parse(storedUser) as User) : null;
		} catch {
			return null;
		}
	});

	// Derive cart from the user object
	const [cart, setCart] = useState<Cart[]>(() =>
		user?.cart ? user.cart : []
	);

	// Orders placed by the user
	const [orderPlaced, setOrderPlaced] = useState<Order[] | []>(() =>
		user?.orderPlaced ? user.orderPlaced : []
	);

	// Function to handle user registration
	const handleRegister = (newUser: User): boolean => {
		const isRegistered = users.some((u) => u.email === newUser.email);

		if (!isRegistered) {
			setUser(newUser);
			setUsers((prev) => [...prev, newUser]);
			return true;
		}
		return false;
	};

	// Function to handle user login
	const handleLogin = (
		email: string,
		password: string
	): { email: boolean; password: boolean } => {
		const status = { email: false, password: false };

		const existingUser = users.find((u) => u.email === email);
		if (!existingUser) {
			status.email = true;
			return status;
		}

		if (existingUser.password === password) {
			setUser(existingUser);
			setCart(existingUser.cart || []); // Load the user's cart
			return status;
		}

		status.password = true;
		return status;
	};

	// Function to handle user logout
	const handleLogout = (): void => {
		setUser(null);
		setCart([]);
		redirect('/login');
	};

	// Function to handle user data update
	const handleUserDataUpdate = (name: string, email: string): void => {
		const emailExists = users.some(u => u.email === email && user?.email !== email);
		if (emailExists) return;
		setUser(prev => {
			if (prev) {
				if (emailExists) return prev;
				return {
					...prev,
					name,
					email,
				};
			}
			return prev;
		});
	};

	// Function to handle adding items to the cart
	const handleAddToCart = (product: Product): void => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find(
				(item) => item.id === product.id
			);

			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}

			return [...prevCart, { id: product.id, quantity: 1, product }];
		});
	};

	const handleIncrement = (id: number) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const handleDecrement = (id: number) => {
		setCart(
			(prevCart) =>
				prevCart
					.map((item) =>
						item.id === id
							? {
									...item,
									quantity:
										item.quantity > 1
											? item.quantity - 1
											: 1,
							  }
							: item
					)
					.filter((item) => item.quantity > 0) // Remove item if quantity is 0
		);
	};

	const handleRemoveFromCart = (id: number) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const handleTotal = () => {
		return cart.reduce((total, item) => {
			const discountedPrice = (
				item.product.price * (1 - item.product.discountPercentage / 100)
			).toFixed(2);
			return total + parseFloat(discountedPrice) * item.quantity;
		}, 0);
	};

	const handlePlaceOrder = () => {
		if (!user) return;

		// Create a new order with the current date and the products in the cart
		const newOrder = {
			id: Date.now().toString(),
			userId: user.id,
			products: cart.map(({product, quantity}) => ({...product, quantity})),
			total: handleTotal(),
			status: "pending",
		};

		const updatedOrders = [...orderPlaced, newOrder];
		setOrderPlaced(updatedOrders);

		// Add the new order to the user's orderPlaced array
		const updatedUser = { ...user, orderPlaced: updatedOrders };
		setUser(updatedUser);

		setUsers((prevUsers) =>
			prevUsers.map((u) => (u.email === user.email ? updatedUser : u))
		);

		// Clear the cart
		setCart([]);		
	};


	// Sync cart updates to the user object
	useEffect(() => {
		if (user) {
			const updatedUser = { ...user, cart };
			setUser(updatedUser);

			// Update the `users` array with the updated user
			setUsers((prevUsers) =>
				prevUsers.map((u) => (u.email === user.email ? updatedUser : u))
			);
		}
	}, [cart]);

	// Persist `user` and `users` to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				handleRegister,
				handleLogin,
				handleLogout,
				cart,
				setCart,
				handleAddToCart,
				handleIncrement,
				handleDecrement,
				handleRemoveFromCart,
				handleUserDataUpdate,
				handleTotal,
				handlePlaceOrder,
				orderPlaced
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
