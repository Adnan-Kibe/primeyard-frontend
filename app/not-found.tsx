'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from "motion/react" 

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
  
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.95}}
    className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <h1 className="text-4xl font-semibold mb-4 text-orange-400">Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been removed.</p>
      <motion.div
      whileHover={{scale: 1.3}}
      >
        <Button variant={'ghost'} onClick={handleGoBack} className='rounded-md border border-orange-400 hover:border-black hover:text-orange-400 '>
          Go Back
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
