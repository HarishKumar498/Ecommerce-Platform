import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        {/* Admin SideBar */} 
        <AdminSidebar open = {openSidebar} setOpen={setOpenSidebar} />
        <div className='flex flex-1 flex-col'>
            {/* Admin Header */} 
            <AdminHeader open = {openSidebar} setOpen={setOpenSidebar}/>
            <main className='flex-1 flex bg-muted/40 p-4md:p-6'>
                <Outlet/>
            </main>
        </div>
      
    </div>
  )
}

export default AdminLayout
