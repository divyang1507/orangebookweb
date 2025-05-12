"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/superbaseclient";

export default function ProfilePage() {
  const { data: session, update, status } = useSession();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        mobile: session.user.mobile || "",
        address: session.user.address || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!session?.user?.email) return;
  
    const { error } = await supabase
      .from("users")
      .update({
        name: form.name,
        mobile: form.mobile,
        address: form.address,
      })
      .eq("email", session.user.email);
  
    if (!error) {
      await update({
        name: form.name,
        mobile: form.mobile,
        address: form.address,
      }); // ✅ this will now go into the jwt → session
      alert("Profile updated!");
    } else {
      alert("Failed to update");
    }
  };

  const handleChangePassword = async () => {
    const { password, confirmPassword } = passwords;

    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("email", session.user.email);

    if (!error) {
      setPasswords({ password: "", confirmPassword: "" });
      alert("Password updated!");
    } else {
      alert("Failed to update password");
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Edit Profile</h2>
  
        <div className="grid grid-cols-1 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Mobile Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Address"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-orange-600 text-white w-full py-2 rounded-lg hover:bg-orange-700 font-semibold transition"
          >
            Save Profile Changes
          </button>
        </div>
  
        <hr className="my-6 border-t border-gray-200" />
  
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Change Password</h2>
  
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={passwords.password}
              onChange={handlePasswordChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Confirm New Password"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 font-semibold transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
  
}
