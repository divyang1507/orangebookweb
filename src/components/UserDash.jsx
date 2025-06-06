'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useGoBack } from '@/utils/Navigation';

const UserDash = ({ session }) => {
  const router = useRouter();
  const goBack = useGoBack();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 text-center">
                  <div>
        <button onClick={goBack} className="mb-4 text-sm text-blue-600 hover:underline">
          Back
        </button>
      </div>
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500">
            <Image
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
              alt="User Avatar"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-4 text-gray-800">{session.user.name}</h1>
        <p className="text-sm text-gray-600 mt-1">{session.user.email}</p>
        <p className="text-sm text-gray-600">{session.user.mobile}</p>

        <Button
          onClick={() => router.push("/user/profile")}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default UserDash;
