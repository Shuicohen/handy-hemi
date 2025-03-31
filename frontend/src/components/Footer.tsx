import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { COMPANY_INFO } from '../constants/config'

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-gray-300">{COMPANY_INFO.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/#work" className="text-gray-300 hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{COMPANY_INFO.address}</li>
              <li>{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.email}</li>
              <li>{COMPANY_INFO.businessHours}</li>
            </ul>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp Chat
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 