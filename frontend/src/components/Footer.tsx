import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { COMPANY_INFO } from '../constants/config'

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language.startsWith('he') ? 'he' : 'en'

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
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="mr-2" />
              {t('contact.whatsapp.button')}
            </a>
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