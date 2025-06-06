'use client'; // only for app directory
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic (API, EmailJS, etc.)
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20">
      <h1 className="text-4xl font-bold text-orange-600 mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">We’d love to hear from you. Send us a message below.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-orange-500 text-xl" />
            <span className="text-gray-700">+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-orange-500 text-xl" />
            <span className="text-gray-700">contact@orangebook.in</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-orange-500 text-xl" />
            <span className="text-gray-700">123 Orange Street, Delhi, India</span>
          </div>
          <div className="mt-8">
            <iframe
              src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64 rounded-xl border border-orange-200"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-200 space-y-4"
        >
          <div>
            <label className="block text-sm text-orange-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-orange-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm text-orange-700 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="mt-1 w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
