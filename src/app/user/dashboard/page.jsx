// app/user/page.jsx
"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HashLoader } from 'react-spinners';

export default function UserPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return  <div className="flex justify-center items-center h-96">
          <HashLoader color="#f97316" />
        </div>
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 text-center">
        <div className="relative">
          <Image
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            alt="Banner"
            className="w-full h-32 rounded-xl object-cover"
            width={400}
            height={120}
          />
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90px] h-[90px] rounded-full border-4 border-white overflow-hidden bg-orange-500">
            <Image
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png"
              alt="Avatar"
              className="object-cover w-full h-full"
              width={90}
              height={90}
            />
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-800">{session.user.name}</h2>
          <p className="text-sm text-gray-500">{session.user.email}</p>
          <p className="text-sm text-gray-500">{session.user.mobile}</p>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => router.push("/user/profile")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
