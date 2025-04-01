import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { COMPANY_INFO } from '../constants/config'
import { FaBars, FaTimes } from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group" aria-label={COMPANY_INFO.name}>
            <img 
              src="/logo.png" 
              alt={COMPANY_INFO.name} 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="ml-3 text-2xl font-bold text-navy-blue tracking-wide transition-transform duration-300 group-hover:scale-105">
              {COMPANY_INFO.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="nav-link"
              aria-label={t('nav.services')}
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="nav-link"
              aria-label={t('nav.reviews')}
            >
              {t('nav.reviews')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-link"
              aria-label={t('nav.contact')}
            >
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="nav-link text-left"
                aria-label={t('nav.services')}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="nav-link text-left"
                aria-label={t('nav.reviews')}
              >
                {t('nav.reviews')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link text-left"
                aria-label={t('nav.contact')}
              >
                {t('nav.contact')}
              </button>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header 