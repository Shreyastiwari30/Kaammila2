import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div>
          <h2 className="text-2xl font-bold text-purple-500">KaamMila</h2>
          <p className="text-sm mt-2 text-gray-400">
            Connecting job seekers with real opportunities — instantly.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-200">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Freelancers</a></li>
            <li><a href="#">Companies</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-200">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-200">Follow Us</h3>
          <div className="flex gap-4 text-lg text-gray-400">
            <a href="#"><FaFacebookF className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} KaamMila. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer
