'use client'
import PropertyCard from '@/components/custom/PropertyCard'
import { Property } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Page = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  console.log(BASEURL)
  const FetchProperties = async () => {
    const response = await axios(`${BASEURL}/properties`)
    return response.data
  }

  const {data:properties, isLoading, error} = useQuery<Property[]>({ queryKey: ['properties'], queryFn: FetchProperties})

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Properties</h1>
      
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
