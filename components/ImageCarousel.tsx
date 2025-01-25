import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Define the type for the props
interface ImageCarouselProps {
	images: string[]; // An array of image URLs (strings)
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const goToImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	// Autoplay for image carousel
	useEffect(() => {
		const interval = setInterval(nextImage, 5000); // Change image every 3 seconds

		return () => clearInterval(interval); // Clear interval when component unmounts
	}, []); // Empty dependency array ensures the interval is set once when component mounts

	return (
		<div className="relative max-w-lg mx-auto aspect-square">
			{/* Main Image Display */}
			<img
				src={images[currentImageIndex]}
				alt="Product"
				className="w-full h-auto rounded-lg shadow-lg transition-all duration-500"
				loading="lazy" // Optimize image loading
			/>

			{/* Navigation Buttons */}
			<button
				onClick={prevImage}
				aria-label="Previous image"
				className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded text-3xl bg-neutral-100 bg-opacity-20 hover:bg-neutral-200 focus:outline-none"
			>
				<FaAngleLeft />
			</button>
			<button
				onClick={nextImage}
				aria-label="Next image"
				className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded text-3xl bg-neutral-100 bg-opacity-20 hover:bg-neutral-200 focus:outline-none"
			>
				<FaAngleRight />
			</button>

			{/* Thumbnails for Navigation */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((image, index) => (
					<div
						key={index}
						onClick={() => goToImage(index)}
						className={`w-16 h-16 cursor-pointer border-2 rounded-md ${
							index === currentImageIndex
								? "border-green-600"
								: "border-transparent"
						}`}
					>
						<img
							src={image}
							alt={`Thumbnail ${index}`}
							className="w-full h-full object-cover rounded-md"
							loading="lazy"
						/>
					</div>
				))}
			</div>

			{/* Image Indicators */}
			<div className="absolute top-4 right-4 text-white">
				<span className="text-xl font-bold">
					{currentImageIndex + 1}/{images.length}
				</span>
			</div>
		</div>
	);
};

export default ImageCarousel;
