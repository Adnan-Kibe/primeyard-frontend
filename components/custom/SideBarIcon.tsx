import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'

type SideBarIconProps = {
    open: boolean
    icon: React.ReactNode
    text: string
    url: string
}

const SideBarIcon = ({ open, icon, text, url }: SideBarIconProps) => {
  return (
    <motion.div 
    className='flex'>
        <Link href={url} className='flex grid-flow-col space-x-2'>
            {icon}
            <AnimatePresence mode='wait'>
            {open && (
                    <motion.p
                        key="text"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.4 }}
                        className="whitespace-nowrap"
                    >
                        {text}
                    </motion.p>
                    )}
            </AnimatePresence>
        </Link>
    </motion.div>
  )
}
export default SideBarIcon