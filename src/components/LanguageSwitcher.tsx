import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en'
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={t('nav.language')}
    >
      <span className="flex items-center">
        {i18n.language === 'en' ? (
          <span className="flex items-center">
            <img 
              src="/images/flags/us.png" 
              alt="English" 
              className="w-5 h-4 mr-2 object-cover rounded-sm"
            />
            <span className="text-sm font-medium">English</span>
          </span>
        ) : (
          <span className="flex items-center">
            <img 
              src="/images/flags/il.png" 
              alt="עברית" 
              className="w-5 h-4 ml-2 object-cover rounded-sm"
            />
            <span className="text-sm font-medium">עברית</span>
          </span>
        )}
      </span>
    </button>
  )
}

export default LanguageSwitcher 