import { PaginationPropsType } from "@/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Pagination({
	length,
	activePage,
	setActivePage,
}: PaginationPropsType) {
	const pages: number[] = Array.from({ length }, (_, index) => index + 1);

	const handlePageChange = (page: number) => {
		setActivePage(page);
	};

	const handlePrevPage = () => {
		if (activePage > 1) {
			setActivePage((prevPage) => prevPage - 1);
		}
	};

	const handleNextPage = () => {
		if (activePage < length) {
			setActivePage((prevPage) => prevPage + 1);
		}
	};

	const getResponsiveVisibilityClass = (
		page: number,
		activePage: number,
		ranges = { md: 1, lg: 2, xl: 3 }
	) => {
		const isVisibleMd = Math.abs(page - activePage) <= ranges.md;
		const isVisibleLg = Math.abs(page - activePage) <= ranges.lg;
        const isVisibleXl = Math.abs(page - activePage) <= ranges.xl;

		let classes = "";
		if (!isVisibleMd) classes += "max-md:hidden ";
		if (!isVisibleLg) classes += "max-lg:hidden ";
        if (!isVisibleXl) classes += "max-xl:hidden";

		return classes.trim();
	};

	return (
		<div className="flex items-center mx-auto w-fit gap-2">
			<button
				className={`border h-10 w-14 grid place-content-center rounded-md ${
					activePage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-200"
				}`}
				onClick={handlePrevPage}
			>
				<FaAngleLeft />
			</button>
			{pages.map((page) => (
				<button
					className={`border h-10 w-14 grid place-content-center rounded-md ${
						activePage === page ? "bg-neutral-300" : "hover:bg-neutral-200"
					} ${getResponsiveVisibilityClass(page, activePage)} `}
					key={page}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</button>
			))}
			<button
				className={`border h-10 w-14 grid place-content-center rounded-md ${
					activePage === length ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-200"
				}`}
				onClick={handleNextPage}
			>
				<FaAngleRight />
			</button>
		</div>
	);
}
