import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

// Lazy load components
const HomePage = React.lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App 