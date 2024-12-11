'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type ReactQueryProviderProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider