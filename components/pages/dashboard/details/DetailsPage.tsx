import { Property } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import DetailComponents from './DetailComponents'
import Loading from '@/app/loading'

interface DetailsPageProps {
  id: string
}

const DetailsPage = ({ id }: DetailsPageProps) => {
    const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    const FetchProperty = async (id: string) => {
        const response = await axios(`${BASEURL}/properties/${id}`)
        return response.data
    }

    const {data:property, isLoading, error} = useQuery<Property>({
        queryKey: ['property', id],
        queryFn: () => FetchProperty(id)
    })
  return (
    <div>
        {isLoading && <Loading />}
        {property && <DetailComponents {...property}/>}
    </div>
  )
}
export default DetailsPage