import React from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/HeroSection'
import WhyChoose from '../components/WhyChoose'
import ServicesSection from '../components/ServicesSection'
import ContactForm from '../components/ContactForm'
import Testimonials from '../components/Testimonials'
import WorkGallery from '../components/WorkGallery'

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Handy Hemi - Professional Home Services</title>
        <meta
          name="description"
          content="Handy Hemi provides professional home maintenance and repair services. Get expert help for plumbing, electrical, HVAC, and more."
        />
        <meta property="og:title" content="Handy Hemi - Professional Home Services" />
        <meta
          property="og:description"
          content="Handy Hemi provides professional home maintenance and repair services. Get expert help for plumbing, electrical, HVAC, and more."
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="flex flex-col space-y-16 sm:space-y-24 md:space-y-32 py-8 sm:py-12 md:py-16">
        <HeroSection />
        <WhyChoose />
        <ServicesSection />
        <WorkGallery />
        <Testimonials />
        <ContactForm />
      </div>
    </>
  )
}

export default Home 