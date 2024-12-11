'use client'
import SideBarIcon from '@/components/custom/SideBarIcon'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { IoMdSettings } from "react-icons/io";
import { MdHome } from "react-icons/md"
import { MdOutlineDashboard } from "react-icons/md"

const SideBar = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex">
            {/* Sidebar */}
            <motion.div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                animate={{ width: isOpen ? 190 : 64 }} 
                initial={{ width: 64 }} 
                transition={{ ease: 'easeInOut', type: "spring", transition: 0.2 }}
                className="fixed top-0 left-0 h-full p-4 rounded-tr-sm rounded-br-sm bg-slate-900 text-orange-400 flex flex-col items-center overflow-hidden z-10"
            >
                <div className="flex flex-col space-y-6 mt-10">
                    <SideBarIcon open={isOpen} icon={<MdHome size={24} />} text="Home" url="/dashboard" />
                    <SideBarIcon open={isOpen} icon={<MdOutlineDashboard size={24} />} text="Properties" url="/dashboard/properties" />
                    <SideBarIcon open={isOpen} icon={<MdHome size={24} />} text="Home" url="/" />
                    <SideBarIcon open={isOpen} icon={<MdHome size={24} />} text="Home" url="/" />
                </div>
                {/* Bottom Icon */}
                <div className="mt-auto flex mb-5">
                    <SideBarIcon open={isOpen} icon={<IoMdSettings size={24} />} text="Settings" url="dashboard/profile" />
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 pl-[64px] mt-4">  {/* Add padding-left to avoid overlap */}
                {children}
            </div>
        </div>
    )
}

export default SideBar
