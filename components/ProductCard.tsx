import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
    id,
	thumbnail,
	title,
	price,
	description,
}: Product) {
	return (
		<Link href={`/products/${id}`} className="shadow-md border rounded-md relative overflow-hidden">
			<div className="aspect-square">
				<Image className="object-cover w-full" priority src={thumbnail} alt={title} height={300} width={300} />
			</div>
			<div className="px-4 pb-4">
				<h3 className="font-bold text line-clamp-1 mt-2">{title}</h3>
				<p className="text-sm mt-2 line-clamp-2">{description}</p>
			</div>
			<h2 className="font-bold text-lg absolute -top-4 -left-1/2 mt-9 ml-10 bg-green-500 text-white py-2 w-full text-center -rotate-45 ">${price}</h2>
		</Link>
	);
}
