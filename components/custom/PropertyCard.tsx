"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@/lib/constants";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import CardCarousel from "./CardCarousel";

const PropertyCard = ({
  property_id,
  name,
  address,
  description,
  price,
  bedrooms,
  bathrooms,
  square_feet,
  latitude,
  longitude,
  status,
  is_featured,
  images,
  inquiries,
}: Property) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const router = useRouter();

  const onClick = () => {
    router.push(`/dashboard/properties/${property_id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      }}
      className="max-w-lg mx-auto mt-6 cursor-pointer"
    >
      <Card
        className="bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg"
        onClick={() => onClick()}
      >
        {/* Header Section */}
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {name}
          </CardTitle>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            {/* Property Image */}
            <div className="w-full">
              <CardCarousel images={images} />
            </div>
            {/* Property Details */}
            <p className="text-gray-600 text-sm mb-2">{description}</p>
            <div className="flex space-x-4 text-xs text-gray-500">
              <span>🏠 {bedrooms} Bedrooms</span>
              <span>🛁 {bathrooms} Bathroom</span>
              <span>📍 {address}</span>
            </div>
            {/* Inquiries Section */}
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-500">
                {inquiries.length} inquiries
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
