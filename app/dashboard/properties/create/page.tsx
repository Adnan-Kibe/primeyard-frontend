'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertySchema, TsPropertySchema } from '@/lib/constants' // your Zod schema
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getAccessToken, refreshAccessToken } from '@/lib/tokenUtils' // assuming tokenUtils handles your tokens

const Page = () => {
    const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string
    const router = useRouter()
    const [images, setImages] = useState<File[]>([]) // State for holding files
    const [imagePreviews, setImagePreviews] = useState<string[]>([]) // State for holding image previews

    // Set up React Hook Form with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm<TsPropertySchema>({
        resolver: zodResolver(PropertySchema),
    })

    // Function to handle image file changes
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files)
            setImages(files) // Store selected files in state
            setImagePreviews(files.map(file => URL.createObjectURL(file))) // Create image previews
        }
    }

    // Function to create property
    const createProperty = async (data: TsPropertySchema) => {
        let accessToken = getAccessToken()

        // If access token is not available, refresh it
        if (!accessToken) {
            accessToken = await refreshAccessToken(BASEURL)
        }

        if (accessToken) {
            try {
                // Prepare form data to send as multipart form-data
                const formData = new FormData()

                // Append regular form fields
                Object.keys(data).forEach((key) => {
                    if (key !== 'images') {
                        const value = data[key as keyof TsPropertySchema]
                        if (typeof value === 'string' || value instanceof Blob) {
                            formData.append(key, value)
                        } else if (typeof value === 'boolean' || typeof value === 'number') {
                            formData.append(key, value.toString())
                        }
                    }
                })

                // Append image files to the form data
                images.forEach((image) => {
                    formData.append('images', image) // Append each image file
                })

                // Send POST request to create the property
                const response = await axios.post(`${BASEURL}/properties/`, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                })

                // Redirect to dashboard after successful creation
                router.push('/dashboard')
            } catch (error) {
                console.error('Error creating property:', error)
            }
        } else {
            console.error('No access token available, unable to create property')
        }
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Create Property</h2>
            <form onSubmit={handleSubmit(createProperty)} className="space-y-4">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Address Input */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        id="address"
                        type="text"
                        {...register('address')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>

                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        id="description"
                        type="text"
                        {...register('description')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Price Input */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        id="price"
                        type="number"
                        {...register('price')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                {/* Bedrooms Input */}
                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <input
                        id="bedrooms"
                        type="number"
                        {...register('bedrooms')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms.message}</p>}
                </div>

                {/* Bathrooms Input */}
                <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <input
                        id="bathrooms"
                        type="number"
                        {...register('bathrooms')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms.message}</p>}
                </div>

                {/* Status Input */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        {...register('status')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="FOR_SALE">For Sale</option>
                        <option value="FOR_RENT">For Rent</option>
                        <option value="SOLD">Sold</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                </div>

                {/* Featured Input */}
                <div>
                    <label htmlFor="is_featured" className="block text-sm font-medium text-gray-700">Is Featured?</label>
                    <input
                        id="is_featured"
                        type="checkbox"
                        {...register('is_featured')}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.is_featured && <p className="text-red-500 text-xs mt-1">{errors.is_featured.message}</p>}
                </div>

                {/* Image Input */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Property Images</label>
                    <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange} // Handle the change event
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
                </div>

                {/* Display Image Previews */}
                {imagePreviews.length > 0 && (
                    <div className="flex space-x-4 mt-4">
                        {imagePreviews.map((imagePreview, index) => (
                            <img key={index} src={imagePreview} alt={`image-preview-${index}`} className="h-32 w-32 object-cover" />
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Create Property
                </Button>
            </form>
        </div>
    )
}

export default Page
