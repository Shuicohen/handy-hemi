import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaWhatsapp, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa'
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants/config'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about the service needed')
})

type ContactFormData = z.infer<typeof contactFormSchema>

const ContactForm: React.FC = () => {
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null)
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error occurred' }))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log('Success:', responseData)
      reset()
      setShowSuccessModal(true)
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setSubmitError('Unable to connect to the server. Please check if the server is running.')
        } else {
          setSubmitError(error.message)
        }
      } else {
        setSubmitError('An unexpected error occurred. Please try again.')
      }
    }
  }

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

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={t('contact.form.namePlaceholder')}
                  dir="auto"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={t('contact.form.emailPlaceholder')}
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={t('contact.form.phonePlaceholder')}
                  dir="ltr"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-y min-h-[100px]"
                  placeholder={t('contact.form.messagePlaceholder')}
                  dir="auto"
                />
                {errors.message && (
                  <p className="text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </div>

            {submitError && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                {submitError}
              </div>
            )}
          </form>

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4" dir="auto">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl relative max-w-md w-full mx-4 transform transition-all">
                <div className="text-center">
                  <FaCheckCircle className="text-green-500 text-4xl sm:text-5xl mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('contact.form.successMessage')}
                  </p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    {t('contact.form.close')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm 