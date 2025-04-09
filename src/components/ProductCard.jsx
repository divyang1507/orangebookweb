import React from 'react'
import { FaStar } from "react-icons/fa";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';




const ProductCard = ({item}) => {

  const  router = useRouter()
  return (
    <div>
      <div className="max-w-2xl mx-auto">


<div className="bg-white shadow-md rounded-lg max-w-2xs md:max-w-xs dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg p-4" src={item.coverimage[0]} alt="product image"/>
    </a>
        <div className="px-5 pb-5">
            <a href="#">
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{item.name}</h3>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <FaStar/>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{item.price}</span>
              <Button onClick={() => router.push("/page/product/id")} className="bg-orange-500 hover:bg-orange-700 text-white">Add to Cart</Button>
               
            </div>
        </div>
</div>
</div>
    </div>
  )
}

export default ProductCard
