'use client';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/superbaseclient';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', address: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(form.password, 10);

    const { error } = await supabase.from('users').insert([
      { ...form, password: hashedPassword }
    ]);

    if (!error) router.push('/page/login');
    else alert('Registration failed');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
