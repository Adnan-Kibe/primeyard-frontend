import z from 'zod'

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type TSsignInSchema = z.infer<typeof signInSchema>


export type Property = {
    property_id: string,
    name: string,
    address: string,
    description: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    square_feet: number,
    latitude: number,
    longitude: number
    status: string,
    is_featured: boolean
}