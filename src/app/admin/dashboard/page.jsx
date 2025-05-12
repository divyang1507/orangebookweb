"use client"
import AddProduct from '@/components/AddProduct'
import AdminProducts from '@/components/AdminProducts'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter(); // Initialize router for navigation
  return (
    <div className='w-full pr-12'>
      <AddProduct/>
      <Button onClick={()=>router.push("/admin/addbook")} className="px-4 py-2 bg-orange-200 hover:outline-2 outline-orange-600 hover:bg-orange-400 rounded-lg">Add New Book ?</Button>
      <AdminProducts/>
    </div>
  )
}

export default page
