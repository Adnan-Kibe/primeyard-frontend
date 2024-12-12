"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Images as ImageType } from "@/lib/constants";

interface CardCarouselProps {
  images: ImageType[];
}

const CardCarousel = ({images}: CardCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 1 }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="overflow-hidden w-full h-48 rounded-md" ref={emblaRef}>
      {/* Embla Container */}
      <div className="flex w-full h-full">
        {/* Embla Slides */}
        {images.map((img) => (
          <div
            key={img.image_id}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <Image
            key={img.image_id}
              src={img.image}
              alt={`Image ${img.image_id}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CardCarousel;
