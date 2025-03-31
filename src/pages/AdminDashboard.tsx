import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  created_at: string
}

interface ApiResponse<T> {
  success: boolean
  data: T[]
}

type Tab = 'contacts' | 'reviews'

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('contacts')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: Tab; id: number } | null>(null)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [selectedItem, setSelectedItem] = useState<Contact | Review | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchData()
  }, [navigate])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      
      if (activeTab === 'contacts') {
        const response = await axios.get<ApiResponse<Contact>>('http://localhost:5000/api/contact', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setContacts(response.data.data)
      } else {
        const response = await axios.get<ApiResponse<Review>>('http://localhost:5000/api/reviews', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setReviews(response.data.data)
      }
    } catch (err) {
      if ((err as any).response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/admin/login')
      } else {
        setError('Failed to fetch data')
        console.error('Error fetching data:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const handleDelete = (type: Tab, id: number) => {
    setItemToDelete({ type, id })
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    try {
      const token = localStorage.getItem('token')
      const endpoint = itemToDelete.type === 'contacts' 
        ? `http://localhost:5000/api/contact/${itemToDelete.id}`
        : `http://localhost:5000/api/reviews/${itemToDelete.id}`

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (itemToDelete.type === 'contacts') {
        setContacts(contacts.filter(c => c.id !== itemToDelete.id))
      } else {
        setReviews(reviews.filter(r => r.id !== itemToDelete.id))
      }

      setDeleteModalOpen(false)
      setItemToDelete(null)
    } catch (err) {
      console.error('Error deleting item:', err)
      setError('Failed to delete item')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredItems = activeTab === 'contacts'
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : reviews.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setExpandedItem(null) // Reset expanded item when changing pages
  }

  const handleRowClick = (item: Contact | Review) => {
    setSelectedItem(item)
    setDetailsModalOpen(true)
  }

  const renderDetailsModal = () => {
    if (!selectedItem) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-medium text-gray-900">Details</h3>
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Name</h4>
              <p className="mt-1 text-gray-600">{selectedItem.name}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Date</h4>
              <p className="mt-1 text-gray-600">{formatDate(selectedItem.created_at)}</p>
            </div>

            {activeTab === 'contacts' ? (
              <>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="mt-1 text-gray-600">{(selectedItem as Contact).email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="mt-1 text-gray-600">{(selectedItem as Contact).phone || '-'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Message</h4>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">{(selectedItem as Contact).message}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 className="font-medium text-gray-900">Rating</h4>
                  <div className="mt-1 flex items-center">
                    <span className="text-yellow-500">{'★'.repeat((selectedItem as Review).rating)}</span>
                    <span className="text-gray-300">{'★'.repeat(5 - (selectedItem as Review).rating)}</span>
                    <span className="ml-2">{(selectedItem as Review).rating}/5</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Comment</h4>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">{(selectedItem as Review).comment}</p>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-10">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-3 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-3 sm:mb-6">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`${
                activeTab === 'contacts'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors`}
            >
              Contact Messages
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 sm:p-4 rounded-lg mb-3 sm:mb-6 shadow-sm text-sm">
            {error}
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-3 sm:mb-6">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'contacts' ? 'contacts' : 'reviews'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base transition-colors"
          />
        </div>

        {/* Table/Card Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Name</th>
                    {activeTab === 'contacts' ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Message</th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Comment</th>
                      </>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedItem === item.id ? 'bg-orange-50' : ''}`}
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      {activeTab === 'contacts' ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(item as Contact).email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(item as Contact).phone || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="relative max-w-xs">
                              <div className={`transition-all duration-200 ${expandedItem === item.id ? '' : 'line-clamp-2'}`}>
                                {(item as Contact).message}
                              </div>
                              {(item as Contact).message.length > 100 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setExpandedItem(expandedItem === item.id ? null : item.id)
                                  }}
                                  className="text-orange-600 hover:text-orange-700 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-colors"
                                >
                                  {expandedItem === item.id ? 'Show less' : 'Show more'}
                                </button>
                              )}
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="text-yellow-500">{'★'.repeat((item as Review).rating)}</span>
                              <span className="text-gray-300">{'★'.repeat(5 - (item as Review).rating)}</span>
                              <span className="ml-2">{(item as Review).rating}/5</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="relative max-w-xs">
                              <div className={`transition-all duration-200 ${expandedItem === item.id ? '' : 'line-clamp-2'}`}>
                                {(item as Review).comment}
                              </div>
                              {(item as Review).comment.length > 100 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setExpandedItem(expandedItem === item.id ? null : item.id)
                                  }}
                                  className="text-orange-600 hover:text-orange-700 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-colors"
                                >
                                  {expandedItem === item.id ? 'Show less' : 'Show more'}
                                </button>
                              )}
                            </div>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(activeTab, item.id)
                          }}
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleRowClick(item)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(item.created_at)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(activeTab, item.id)
                      }}
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  {activeTab === 'contacts' ? (
                    <>
                      <p className="text-sm text-gray-600">{(item as Contact).email}</p>
                      {(item as Contact).phone && (
                        <p className="text-sm text-gray-600">{(item as Contact).phone}</p>
                      )}
                      <div className="relative">
                        <p className={`text-sm text-gray-600 ${expandedItem === item.id ? '' : 'line-clamp-2'}`}>
                          {(item as Contact).message}
                        </p>
                        {(item as Contact).message.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedItem(expandedItem === item.id ? null : item.id)
                            }}
                            className="text-orange-600 hover:text-orange-700 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-colors"
                          >
                            {expandedItem === item.id ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <span className="text-yellow-500">{'★'.repeat((item as Review).rating)}</span>
                        <span className="text-gray-300">{'★'.repeat(5 - (item as Review).rating)}</span>
                        <span className="ml-2 text-sm">{(item as Review).rating}/5</span>
                      </div>
                      <div className="relative">
                        <p className={`text-sm text-gray-600 ${expandedItem === item.id ? '' : 'line-clamp-2'}`}>
                          {(item as Review).comment}
                        </p>
                        {(item as Review).comment.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedItem(expandedItem === item.id ? null : item.id)
                            }}
                            className="text-orange-600 hover:text-orange-700 text-xs mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded transition-colors"
                          >
                            {expandedItem === item.id ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mt-3 sm:mt-6">
            <div className="flex justify-center space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Details Modal */}
        {detailsModalOpen && renderDetailsModal()}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard 