'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const UserDash = ({session}) => {
    const router = useRouter();

    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Email: {session.user.email}</p>
        <p>Mobile: {session.user.mobile}</p>
        <Button  
          onClick={() => router.push("/user/profile")}
          className="bg-blue-500 text-white"
        >
          Edit Profile
        </Button>
      </div>
    );
}

export default UserDash
