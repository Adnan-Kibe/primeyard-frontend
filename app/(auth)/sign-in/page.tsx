import { signInSchema, TSsignInSchema } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<TSsignInSchema>({resolver: zodResolver(signInSchema)})

    return (
        <div>Sign In page</div>
    )
}

export default page