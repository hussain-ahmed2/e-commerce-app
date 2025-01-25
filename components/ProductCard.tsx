import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
	id,
	thumbnail,
	title,
	price,
	discountPercentage,
	description,
}: Product) {
	const discountedPrice = price * (1 - discountPercentage / 100);

	return (
		<Link
			href={`/products/${id}`}
			className="shadow-md border rounded-md relative overflow-hidden group"
		>
			<div className="aspect-square">
				<Image
					className="object-cover w-full"
					priority
					src={thumbnail}
					alt={`Image of ${title}`}
					height={300}
					width={300}
				/>
			</div>
			<div className="px-4 pb-4">
				<h3 className="font-bold text-lg line-clamp-1 mt-2">{title}</h3>
				<p className="text-sm mt-2 line-clamp-2">{description}</p>
			</div>
			<div className="px-4 pb-4 mt-auto">
				<div className="flex justify-between items-center">
					<span className="font-bold text-lg text-green-500">
						${discountedPrice.toFixed(2)}
					</span>
					<span className="font-bold text-sm text-gray-500 line-through">
						${price.toFixed(2)}
					</span>
				</div>
			</div>
		</Link>
	);
}
