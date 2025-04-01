import React from 'react'
import { useTranslation } from 'react-i18next'

import { FaWhatsapp, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants/config'





const ContactForm: React.FC = () => {
  const { t } = useTranslation()

  const handleWhatsAppClick = () => {
    window.open(SOCIAL_LINKS.whatsapp, '_blank')
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-gray-50" dir="auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-navy-blue mb-4">
                {t('contact.form.title')}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-4">
                {t('contact.form.description')}
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-navy-blue mb-4">
                {t('contact.whatsapp.title')}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-4">
                {t('contact.whatsapp.description')}
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse mx-auto transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FaWhatsapp className="text-xl" />
                <span>{t('contact.whatsapp.button')}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center">
                <FaPhone className="text-orange-500 text-3xl mb-4" />
                <h4 className="text-lg font-semibold text-navy-blue mb-2 text-center">
                  {t('contact.info.callUs')}
                </h4>
                <p className="text-gray-600 text-center" dir="ltr">{COMPANY_INFO.phone}</p>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center">
                <FaEnvelope className="text-orange-500 text-3xl mb-4" />
                <h4 className="text-lg font-semibold text-navy-blue mb-2 text-center">
                  {t('contact.info.emailUs')}
                </h4>
                <p className="text-gray-600 text-center" dir="ltr">{COMPANY_INFO.email}</p>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="flex flex-col items-center">
                <FaClock className="text-orange-500 text-3xl mb-4" />
                <h4 className="text-lg font-semibold text-navy-blue mb-2 text-center">
                  {t('contact.info.hours')}
                </h4>
                <p className="text-gray-600 text-center">{COMPANY_INFO.businessHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm 