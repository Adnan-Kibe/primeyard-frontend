'use client'
import PropertyCard from '@/components/custom/PropertyCard'
import { Button } from '@/components/ui/button'
import { Property } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  const FetchProperties = async () => {
    const response = await axios(`${BASEURL}/properties`)
    return response.data
  }

  const {data:properties, isLoading, error} = useQuery<Property[]>({ queryKey: ['properties'], queryFn: FetchProperties})

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Properties</h1>
      <Button asChild>
        <Link href={"properties/create"}>Add Property</Link>
      </Button>
      
        {
          !properties ? 
          (
            <div className='flex items-center justify-center min-h-screen'>There is currently no properties available</div>
          ) :
          (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                properties.map((property) => <PropertyCard key={property.property_id} {...property} />)
              }
            </div>
          )
        }
    </div>
  )
}

export default Page
