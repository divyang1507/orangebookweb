"use client";
import { Button } from '@/components/ui/button'
import React from 'react'
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import { authOptions } from '@/lib/auth';

const page =  async () => {
  const router = useRouter(); // Initialize router for navigation
    const session = await getServerSession(authOptions); // Get user session

    if (!session) {
      redirect("/login"); // Redirect to login if no session
    }
  return (


    <div>
    <h1>Welcome, {session.user.name}!</h1>
    <p>Email: {session.user.email}</p>
    <p>Mobile: {session.user.mobile}</p>
    <Button onClick={() => router.push("/user/profile")} className='bg-blue-500 text-white'>Edit Profile</Button>
  </div>
    // <div>
    //      <div className="flex flex-col justify-center items-center mt-24">
    //         <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
    //             <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
    //                 <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"/> 
    //                 <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
    //                     <img className="h-full w-full rounded-full" src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png' alt="" />
    //                 </div>
    //             </div> 
    //             <div className="mt-16 flex flex-col items-center">
    //                 <h4 className="text-xl font-bold text-navy-700 dark:text-white">
    //                 Adela Parkson
    //                 </h4>
    //                 <p className="text-base font-normal text-gray-600">Product Manager</p>
    //             </div> 
    //             <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
    //                 <div className="flex flex-col items-center justify-center">
    //                 <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
    //                 <p className="text-sm font-normal text-gray-600">Posts</p>
    //                 </div>
    //                 <div className="flex flex-col items-center justify-center">
    //                 <p className="text-2xl font-bold text-navy-700 dark:text-white">
    //                     9.7K
    //                 </p>
    //                 <p className="text-sm font-normal text-gray-600">Followers</p>
    //                 </div>
    //                 <div className="flex flex-col items-center justify-center">
    //                 <p className="text-2xl font-bold text-navy-700 dark:text-white">
    //                     434
    //                 </p>
    //                 <p className="text-sm font-normal text-gray-600">Following</p>
    //                 </div>
    //             </div>
    //                 <Button className={"mt-4"}>Edit Profile</Button>
    //         </div>  
    //     </div>
    // </div>
  )
}

export default page
