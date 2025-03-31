import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTimes, FaExchangeAlt } from 'react-icons/fa'

interface WorkItem {
  id: number
  beforeImage: string
  afterImage: string
  translationKey: string
}

const WorkGallery: React.FC = () => {
  const { t } = useTranslation()
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showingAfter, setShowingAfter] = useState(false)

  const workItems: WorkItem[] = [
    {
      id: 1,
      beforeImage: '/work/window-track-before.jpg',
      afterImage: '/work/window-track-after.jpg',
      translationKey: 'window-track'
    },
    // Add more work items as needed
  ]

  const handleItemClick = (item: WorkItem, index: number) => {
    setSelectedWork(item)
    setCurrentIndex(index)
    setShowingAfter(false)
  }

  const handleClose = () => {
    setSelectedWork(null)
    setShowingAfter(false)
  }

  const handlePrevItem = () => {
    const newIndex = (currentIndex - 1 + workItems.length) % workItems.length
    setCurrentIndex(newIndex)
    setSelectedWork(workItems[newIndex])
    setShowingAfter(false)
  }

  const handleNextItem = () => {
    const newIndex = (currentIndex + 1) % workItems.length
    setCurrentIndex(newIndex)
    setSelectedWork(workItems[newIndex])
    setShowingAfter(false)
  }

  const toggleBeforeAfter = () => {
    setShowingAfter(!showingAfter)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedWork) return

    switch (e.key) {
      case 'ArrowLeft':
        handlePrevItem()
        break
      case 'ArrowRight':
        handleNextItem()
        break
      case ' ':
        e.preventDefault()
        toggleBeforeAfter()
        break
      case 'Escape':
        handleClose()
        break
      default:
        break
    }
  }, [selectedWork])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section id="work" className="py-16 bg-gray-50" dir="auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t('gallery.title')}</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t('gallery.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              onClick={() => handleItemClick(item, index)}
            >
              <div className="relative aspect-[4/3]">
                {/* After Image (Bottom Layer) */}
                <div className="absolute inset-0 z-10">
                  <img
                    src={item.afterImage}
                    alt={t('gallery.afterImageAlt', { title: t(`gallery.items.${item.translationKey}.title`) })}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 end-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {t('gallery.viewAfter')}
                  </div>
                </div>
                
                {/* Before Image (Top Layer) */}
                <div 
                  className="absolute inset-0 z-20 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
                >
                  <img
                    src={item.beforeImage}
                    alt={t('gallery.beforeImageAlt', { title: t(`gallery.items.${item.translationKey}.title`) })}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 start-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {t('gallery.viewBefore')}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {t(`gallery.items.${item.translationKey}.title`)}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {t(`gallery.items.${item.translationKey}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedWork && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden relative" dir="auto">
              {/* Header */}
              <div className="bg-gradient-to-b from-black/50 to-transparent absolute top-0 start-0 end-0 p-6 z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {t(`gallery.items.${selectedWork.translationKey}.title`)}
                    </h3>
                    <p className="text-gray-200">
                      {t(`gallery.items.${selectedWork.translationKey}.description`)}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label={t('gallery.closeButton')}
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative flex items-center justify-center p-4 mt-24">
                {/* Before Image */}
                <div className={`w-full transition-opacity duration-300 ${showingAfter ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="relative">
                    <img
                      src={selectedWork.beforeImage}
                      alt={t('gallery.beforeImageAlt', { title: t(`gallery.items.${selectedWork.translationKey}.title`) })}
                      className="w-full max-h-[70vh] object-contain rounded-lg"
                    />
                    <div className="absolute top-4 start-4 bg-black/75 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {t('gallery.viewBefore')}
                    </div>
                  </div>
                </div>

                {/* After Image */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${showingAfter ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="relative">
                    <img
                      src={selectedWork.afterImage}
                      alt={t('gallery.afterImageAlt', { title: t(`gallery.items.${selectedWork.translationKey}.title`) })}
                      className="w-full max-h-[70vh] object-contain rounded-lg"
                    />
                    <div className="absolute top-4 start-4 bg-black/75 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {t('gallery.viewAfter')}
                    </div>
                  </div>
                </div>

                {/* Switch Button */}
                <button
                  onClick={toggleBeforeAfter}
                  className="absolute top-1/2 -translate-y-1/2 end-4 bg-black/75 backdrop-blur-sm p-3 rounded-full hover:bg-black transition-colors z-20 shadow-lg flex items-center gap-2 text-white"
                  aria-label={t('gallery.toggleButton')}
                >
                  <FaExchangeAlt className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {showingAfter ? t('gallery.viewBefore') : t('gallery.viewAfter')}
                  </span>
                </button>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-t from-black/50 to-transparent absolute bottom-0 start-0 end-0 p-4 text-center">
                <p className="text-white text-sm">
                  {t('gallery.instructions')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default WorkGallery 