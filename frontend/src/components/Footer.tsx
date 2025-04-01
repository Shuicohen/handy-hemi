import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants/config'

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language.startsWith('he') ? 'he' : 'en'

  const handleWhatsAppClick = () => {
    window.open(SOCIAL_LINKS.whatsapp[currentLang], '_blank')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-navy-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-gray-300">{COMPANY_INFO.description[currentLang]}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('work')}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.work')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.reviews')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{COMPANY_INFO.address[currentLang]}</li>
              <li>{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.email}</li>
              <li>{COMPANY_INFO.businessHours}</li>
            </ul>
            <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse mx-auto transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FaWhatsapp className="text-xl" />
                <span>{t('contact.whatsapp.button')}</span>
              </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. {t('footer.rights')} | Built By{' '}
            <a 
              href="https://portfolio-page-kdqi.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Shui
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 