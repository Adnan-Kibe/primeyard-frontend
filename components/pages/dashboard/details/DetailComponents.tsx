import { Button } from '@/components/ui/button'
import { Property } from '@/lib/constants'
import { getAccessToken, refreshAccessToken } from '@/lib/tokenUtils'
import axios from 'axios'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React from 'react'


const DetailComponents = ({ property_id, name, address, description, price, bedrooms, bathrooms, square_feet, latitude, longitude, status, is_featured, images, inquiries }: Property) => {
    const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string
    const router = useRouter()

    // Function to delete property, includes token management
    const deleteProperty = async () => {
        let accessToken = getAccessToken()

        if (!accessToken) {
            accessToken = await refreshAccessToken(BASEURL)
        }

        if (accessToken) {
            try {
                // Include the access token in the Authorization header
                await axios.delete(`${BASEURL}/properties/${property_id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                router.push('/dashboard/properties')
            } catch (error) {
                console.error('Error deleting property:', error)
            }
        } else {
            console.error('No access token available, unable to delete property')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div> {name} </div>
            <div className='flex space-x-4 text-gray-500'>
                <span> Kshs {price} </span>
                <span>🏠 {bedrooms} Bedrooms</span>
                <span>🛁 {bathrooms} Bathroom</span>
                <span>📍 {address}</span>
            </div>
            <Button variant={'destructive'} onClick={deleteProperty}>Delete</Button>
        </motion.div>
    )
}

export default DetailComponents
