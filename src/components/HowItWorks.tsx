import React from 'react'

interface StepProps {
  number: number
  title: string
  description: string
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-navy-blue mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Request a Quote",
      description: "Fill out our simple form and tell us about your project needs."
    },
    {
      number: 2,
      title: "Schedule a Visit",
      description: "Choose a convenient time for our expert to assess your project."
    },
    {
      number: 3,
      title: "Sit Back & Relax",
      description: "We'll handle everything while you enjoy peace of mind."
    }
  ]

  return (
    <section className="py-16 bg-light-gray">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-semibold text-center text-navy-blue mb-12">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-start">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 