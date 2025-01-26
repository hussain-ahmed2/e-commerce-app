import { ProductListContext } from "@/context/ProductListContext";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchProducts() {
	const { searchTerm, setSearchTerm } = useContext(ProductListContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

	return (
		<form onSubmit={handleSubmit} className="flex items-center justify-center max-w-lg mx-auto container">
			<div className="w-full relative">
				<input
					value={searchTerm}
					onChange={handleChange}
					className="p-2 rounded-s border w-full"
					type="text"
					name="search"
					id="search"
					placeholder="Search Products..."
				/>
				{searchTerm && (
					<FaTimes onClick={() => setSearchTerm("")} className="absolute w-8 h-8 p-2 top-1/2 right-0 -translate-x-1 -translate-y-1/2 cursor-pointer hover:bg-gray-200 rounded-full" />
				)}
			</div>
			<button
				className=" border hover:bg-gray-200 p-3 rounded-e"
				type="submit"
			>
				<FaMagnifyingGlass />
			</button>
		</form>
	);
}
