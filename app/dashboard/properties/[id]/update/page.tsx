import { useMutation } from '@tanstack/react-query'
import React from 'react'

const page = () => {
   const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
   const mutation = useMutation

    return (
        <div>page</div>
    )
}

export default page