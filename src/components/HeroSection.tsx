import React from 'react'
import { useTranslation } from 'react-i18next'

const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full bg-navy-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center py-12 sm:py-16 lg:py-24 gap-8 lg:gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-white/80 mt-4 text-base sm:text-lg max-w-2xl mx-auto lg:ms-0">
              {t('hero.subtitle')}
            </p>
            <button
              onClick={scrollToContact}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 mt-6 sm:mt-8 font-medium transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-navy-blue"
            >
              {t('hero.cta')}
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center items-center">
            <div className="relative w-full h-auto rounded-lg overflow-hidden bg-white/10">
              <img
                src="/hero-handy.jpeg"
                alt={t('hero.title')}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="text-white/50 text-sm">${t('hero.imageAlt')}</span>`
                    parent.className += ' flex items-center justify-center'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 