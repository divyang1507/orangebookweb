"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
// import toast from "react-toastify";

export default function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();

  async function onSubmit(data) {
    const res = await fetch("/api/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: session?.user?.id,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    });

    const result = await res.json();

    if (res.ok) {
    //   toast.success("Password updated!");
    } else {
    //   toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-lg">
      <input {...register("oldPassword")} type="password" placeholder="Old Password" />
      <input {...register("newPassword")} type="password" placeholder="New Password" />
      <button type="submit">Change Password</button>
    </form>
  );
}
