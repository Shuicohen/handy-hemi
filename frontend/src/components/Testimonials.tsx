import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'

const Testimonials: React.FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.body.appendChild(script)

    // Cleanup function to remove script on unmount
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleAddReview = () => {
    window.open('https://g.page/r/CThP01FFrMAXEBM/review', '_blank')
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-gray-50" dir="auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              {t('testimonials.description')}
            </p>
            <button
              onClick={handleAddReview}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <FaStar className="mr-2" />
              {t('testimonials.addReview')}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <div className="flex justify-center">
              <div className="w-full">
                <div className="elfsight-app-215b7e10-1cc7-4dc5-9b18-035494e7db0c" data-elfsight-app-lazy></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 