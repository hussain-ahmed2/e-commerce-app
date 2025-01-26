import { CategoriesSidebarPropsType, Category } from "@/types";
import Error from "./Error";
import Loader from "./Loader";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";

export default function CategoriesSidebar({
	categories,
	loading,
	error,
	selectedCategory,
	setSelectedCategory,
}: CategoriesSidebarPropsType) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleCategoryChange = (category: Category) => {
		setSelectedCategory(category);
		setIsOpen(false);
	};
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<aside className="w-full p-4 bg-neutral-100 h-fit max-md:absolute max-md:top-0 max-md:left-0">
			<div className={`flex items-center justify-between md:mb-4 transition-all duration-300 ${isOpen ? "mb-4" : "mb-0"}`}>
				<h2 className="text-xl font-bold">Categories</h2>
				<div className="md:hidden">
					selected: <span className="font-bold text-emerald-500">{selectedCategory?.name}</span>
				</div>
				<button onClick={handleToggle} className="md:hidden text-xl">
					<FaBars />
				</button>
			</div>
			<ul className={`space-y-2 md:max-h-[90vh] overflow-y-auto transition-all duration-300 ${  isOpen ? "max-h-[50vh]" : "max-h-0"}`}>
				{loading && !categories.length ? (
					<Loader />
				) : error ? (
					<Error message="Error Fetching Categories" />
				) : (
					categories.map((category) => (
						<li key={category.slug}>
							<button

								onClick={() => handleCategoryChange(category)}
								className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
									selectedCategory?.name === category.name
										? "bg-emerald-500 text-white"
										: "bg-white text-gray-800 hover:bg-gray-200"
								}`}
							>
								{category.name}
							</button>
						</li>
					))
				)}
			</ul>
		</aside>
	);
}
