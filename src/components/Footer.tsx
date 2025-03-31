import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants/config'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const handleWhatsAppClick = () => {
    window.open(SOCIAL_LINKS.whatsapp, '_blank')
  }

  return (
    <footer className="bg-navy-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Area */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{COMPANY_INFO.name}</h2>
            <p className="text-gray-300 mb-4">{COMPANY_INFO.tagline}</p>
            <p className="text-gray-300 text-sm">{COMPANY_INFO.emergencyService}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-orange-500" />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-orange-500" />
                <span>{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaClock className="text-orange-500" />
                <span>{COMPANY_INFO.businessHours}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaWhatsapp className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 