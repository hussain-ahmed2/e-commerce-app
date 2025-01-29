import Image from "next/image";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Define the type for the props
interface ImageCarouselProps {
	images: string[]; // An array of image URLs (strings)
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
	// State to track the current image index
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

	// Functions to handle image navigation
	const nextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	// Function to handle image navigation
	const prevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	// Function to handle image navigation
	const goToImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	// Autoplay for image carousel
	useEffect(() => {
		const interval = setInterval(nextImage, 5000); // Change image every 5 seconds

		return () => clearInterval(interval); // Clear interval when component unmounts
	}, []); // Empty dependency array ensures the interval is set once when component mounts

	return (
		<div className="relative max-w-lg mx-auto aspect-square overflow-hidden">
			{/* Carousel Container */}
			<div
				className="flex transition-transform duration-500"
				style={{
					transform: `translateX(-${currentImageIndex * 100}%)`,
				}}
			>
				{images.map((image, index) => (
					<Image
						key={index}
						src={image}
						alt={`Slide ${index + 1}`}
						className="w-full h-auto rounded-lg shadow-lg flex-shrink-0"
						priority
						width={300}
						height={300}
					/>
				))}
			</div>

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
						className={`w-12 md:w-14 h-12 md:h-14 cursor-pointer border-2 rounded-md ${
							index === currentImageIndex
								? "border-green-600"
								: "border-transparent"
						}`}
					>
						<Image
							src={image}
							alt={`Thumbnail ${index}`}
							className="w-full h-full object-cover rounded-md"
							priority
							width={50}
							height={50}
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
