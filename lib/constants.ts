import z from 'zod'

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export type TSsignInSchema = z.infer<typeof signInSchema>

export type Images = {
    image_id: string;
    image: string;
};

export type Inquire = {
    inquire_id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
};

export type Status = 'FOR_SALE' | 'FOR_RENT' | 'SOLD';

export type Property = {
    property_id: string;
    name: string;
    address: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_feet: number;
    latitude?: number;
    longitude?: number;
    status: Status;
    is_featured: boolean;
    images: Images[];
    inquiries: Inquire[];
};

export const PropertySchema = z.object({
    property_id: z.string(),
    name: z.string(),
    address: z.string(),
    description: z.string(),
    price: z.string(),
    bedrooms: z.string(),
    bathrooms: z.string(),
    square_feet: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    status: z.enum(['FOR_SALE', 'FOR_RENT', 'SOLD']),
    is_featured: z.boolean(),
    images: z.array(
        z.object({
            image: z.string(),
        })
    )
});

export type TsPropertySchema = z.infer<typeof PropertySchema>;