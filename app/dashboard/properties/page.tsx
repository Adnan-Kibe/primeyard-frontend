'use client'
import PropertyCard from '@/components/custom/PropertyCard'
import { Property } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Page = () => {
  const BASEURL = process.env.BACKEND_BASE_URL
  const FetchProperties = async () => {
    const response = await axios(`${BASEURL}/properties`)
    return response.data
  }

  const {data:properties, isLoading, error} = useQuery<Property[]>({ queryKey: ['properties'], queryFn: FetchProperties})

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(20)].map((_, i) => (
          <PropertyCard key={i} />
        ))}
      </div>
    </div>
  )
}

export default Page
