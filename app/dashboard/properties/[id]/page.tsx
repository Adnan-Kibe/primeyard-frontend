'use client'
import DetailsPage from '@/components/pages/dashboard/details/DetailsPage'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const param = useParams()
  const id = param?.id as string
  return (
    <div>
      <DetailsPage id={id} />
    </div>
  )
}

export default page