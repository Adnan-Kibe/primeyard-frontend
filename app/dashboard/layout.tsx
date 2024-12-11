import SideBar from '@/components/pages/dashboard/SideBar'
import React from 'react'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-gray-300 min-h-screen p-6">
      {/* Sidebar with wrapped children */}
      <SideBar>
        {children}
      </SideBar>
    </div>
  )
}

export default DashboardLayout
