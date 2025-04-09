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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Name"
      />
      <input
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Mobile"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Address"
      />

      <button
        onClick={handleUpdate}
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mb-6"
      >
        Save Profile Changes
      </button>

      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <input
        type="password"
        name="password"
        value={passwords.password}
        onChange={handlePasswordChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="New Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={passwords.confirmPassword}
        onChange={handlePasswordChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Confirm New Password"
      />

      <button
        onClick={handleChangePassword}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Change Password
      </button>
    </div>
  );
}
