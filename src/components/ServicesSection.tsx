import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FaWrench, 
  FaTools, 
  FaCouch, 
  FaPaintRoller, 
  FaHammer, 
  FaPlug, 
  FaLightbulb, 
  FaCalendarAlt 
} from 'react-icons/fa'

interface ServiceCardProps {
  icon: React.ReactNode
  translationKey: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, translationKey }) => {
  const { t } = useTranslation()
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-navy-blue text-3xl sm:text-4xl mb-4 sm:mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-lg sm:text-xl text-navy-blue mb-2 sm:mb-3">
        {t(`services.items.${translationKey}.title`)}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {t(`services.items.${translationKey}.description`)}
      </p>
    </div>
  )
}

const ServicesSection: React.FC = () => {
  const { t } = useTranslation()
  
  const services = [
    {
      icon: <FaWrench />,
      translationKey: "repairs"
    },
    {
      icon: <FaTools />,
      translationKey: "plumbing"
    },
    {
      icon: <FaCouch />,
      translationKey: "furniture"
    },
    {
      icon: <FaPaintRoller />,
      translationKey: "painting"
    },
    {
      icon: <FaHammer />,
      translationKey: "drywall"
    },
    {
      icon: <FaPlug />,
      translationKey: "appliances"
    },
    {
      icon: <FaLightbulb />,
      translationKey: "lighting"
    },
    {
      icon: <FaCalendarAlt />,
      translationKey: "maintenance"
    }
  ]

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            {t('services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              translationKey={service.translationKey}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 