import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaClock, FaCheckCircle } from 'react-icons/fa'

interface FeatureCardProps {
  icon: React.ReactNode
  translationKey: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, translationKey }) => {
  const { t } = useTranslation()
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-navy-blue rounded-full flex items-center justify-center mb-6">
          <div className="text-white text-3xl sm:text-4xl">
            {icon}
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-navy-blue mb-3 rtl:text-right">
          {t(`whyChoose.features.${translationKey}.title`)}
        </h3>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed rtl:text-right">
          {t(`whyChoose.features.${translationKey}.description`)}
        </p>
      </div>
    </div>
  )
}

const WhyChoose: React.FC = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: <FaClock />,
      translationKey: 'onTime'
    },
    {
      icon: <FaCheckCircle />,
      translationKey: 'satisfaction'
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4 rtl:text-right">
            {t('whyChoose.title')}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg rtl:text-right">
            {t('whyChoose.subtitle')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                translationKey={feature.translationKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose 