import AddProduct from '@/components/AddProduct'
import AdminProducts from '@/components/AdminProducts'
import React from 'react'

const page = () => {
  return (
    <div className='w-full pr-12'>
      <AddProduct/>
      <AdminProducts/>
    </div>
  )
}

export default page
