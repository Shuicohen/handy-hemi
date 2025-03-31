import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'
import api from '../config/api'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  created_at: string
}

interface ApiResponse {
  success: boolean
  data: Review[]
}

interface ApiPostResponse {
  success: boolean
  data: Review
}

const Testimonials: React.FC = () => {
  const { t } = useTranslation()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await api.get<ApiResponse>('/reviews')
      setReviews(response.data.data)
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError(t('testimonials.error.fetch'))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await api.post<ApiPostResponse>('/reviews', formData)
      if (response.status === 201) {
        setFormData({ name: '', rating: 5, comment: '' })
        setIsModalOpen(false)
        // Fetch updated reviews
        fetchReviews()
      }
    } catch (err) {
      console.error('Error submitting review:', err)
      setSubmitError(t('testimonials.error.submit'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(t('locale'), {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const renderStarInput = () => {
    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            className="focus:outline-none"
          >
            <FaStar
              className={`text-2xl ${
                (hoveredRating !== null ? star <= hoveredRating : star <= formData.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const renderModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl" dir="auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-semibold text-navy-blue">{t('testimonials.modal.title')}</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">{t('testimonials.modal.close')}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('testimonials.form.name')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
                placeholder={t('testimonials.form.namePlaceholder')}
                dir="auto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('testimonials.form.rating')}
              </label>
              <div className="bg-white p-3 rounded-md border border-gray-300">
                {renderStarInput()}
              </div>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                {t('testimonials.form.comment')}
              </label>
              <textarea
                id="comment"
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
                placeholder={t('testimonials.form.commentPlaceholder')}
                dir="auto"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                {t('testimonials.form.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('testimonials.form.submitting') : t('testimonials.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-light-gray" dir="auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold text-navy-blue mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('testimonials.description')}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            {t('testimonials.addReview')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              dir="auto"
            >
              <div className="flex items-center mb-4 space-x-1 rtl:space-x-reverse">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <FaStar key={i + review.rating} className="text-gray-300" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div>
                <p className="font-semibold text-navy-blue">{review.name}</p>
                <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && renderModal()}
    </section>
  )
}

export default Testimonials 