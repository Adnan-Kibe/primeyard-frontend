'use client'
import { Button } from '@/components/ui/button'
import { signInSchema, TSsignInSchema } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
    const BASEURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TSsignInSchema>({ resolver: zodResolver(signInSchema) })
    const router = useRouter()

    const storeTokens = (data: { access: string, refresh: string }) => {
        // Store the access token in localStorage
        localStorage.setItem('access_token', data.access)
        // Store the refresh token in an HTTP-only cookie (for security)
        document.cookie = `refresh_token=${data.refresh}; path=/; Secure; HttpOnly`
    }

    const onSubmit = async (data: TSsignInSchema) => {
        try {
            const response = await axios.post(`${BASEURL}/users/api/token/`, data)
            const { access, refresh } = response.data

            // Store tokens in localStorage and cookie
            storeTokens({ access, refresh })

            reset()
            router.push('/dashboard')  
        } catch (error) {
            console.error('Error during login:', error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            {...register('email')}
                            className={`w-full px-4 py-2 border rounded-md text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="******"
                            {...register('password')}
                            className={`w-full px-4 py-2 border rounded-md text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default page
