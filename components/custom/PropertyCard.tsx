'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import React, { useRef } from 'react';

const PropertyCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.5 }}
      className="max-w-lg mx-auto mt-6"
    >
      <Link href={"/dashboard/properties/1"}>
        <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg">
          {/* Header Section */}
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Modern City Apartment
            </CardTitle>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="p-4">
            <div className="flex flex-col">
              {/* Property Image */}
              <img
                src="https://via.placeholder.com/300"
                alt="Property"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              {/* Property Details */}
              <p className="text-gray-600 text-sm mb-2">
                This modern apartment is located in the heart of the city, with all the amenities you need for a comfortable lifestyle.
              </p>
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>🏠 2 Bedrooms</span>
                <span>🛁 1 Bathroom</span>
                <span>📍 Downtown Area</span>
              </div>
              {/* Inquiries Section */}
              <div className="flex justify-end mt-2">
                <span className="text-xs text-gray-500">2 inquiries</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
