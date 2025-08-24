"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Database
} from "lucide-react"

const floatingTerms = [
  { text: "New Medical Studies", color: "text-red-500" },
  { text: "Conflicting Guidelines", color: "text-orange-500" },
  { text: "Drug Updates", color: "text-yellow-600" },
  { text: "Treatment Protocols", color: "text-purple-500" },
  { text: "Regional Disease Patterns", color: "text-pink-500" },
  { text: "Safety Alerts", color: "text-indigo-500" }
]

export default function Challenge() {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isResolved, setIsResolved] = useState(false)
  const [containerDimensions, setContainerDimensions] = useState({ width: 300, height: 400 })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsResolved(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerDimensions({
          width: rect.width - 100, // Leave padding for cards
          height: rect.height - 80  // Leave padding for cards
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isInView])

  // Generate responsive positioning
  const getRandomPosition = () => ({
    x: Math.random() * Math.max(containerDimensions.width, 150),
    y: Math.random() * Math.max(containerDimensions.height, 200)
  })

  return (
    <section ref={ref} className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>The Doctor's Dilemma</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight">
                Medical Knowledge{" "}
                <span className="text-red-500">Overload</span>{" "}
                is Real
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                As a doctor, you face an impossible challenge: staying current with exponentially growing medical knowledge while making critical decisions under time pressure. Traditional search methods can't keep up.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">2.5M+ New Research Papers</h3>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Published annually - impossible for doctors to track</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Minutes to Decide</h3>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Critical decisions with limited time for research</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Information Scattered</h3>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Across journals, databases, and clinical guidelines</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <p className="text-base sm:text-lg text-gray-700 font-medium">
                Zenethe's AI RAG technology solves this by instantly synthesizing vast medical datasets into actionable insights for doctors.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-80 sm:h-96 lg:h-[500px] w-full"
          >
            <div 
              ref={containerRef}
              className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden"
            >
              {/* Chaotic floating terms */}
              {!isResolved && floatingTerms.map((term, index) => (
                <motion.div
                  key={index}
                  className={`absolute bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-md text-xs sm:text-sm font-medium ${term.color} border border-gray-200 max-w-[120px] sm:max-w-none`}
                  initial={getRandomPosition()}
                  animate={{
                    x: [
                      getRandomPosition().x,
                      getRandomPosition().x,
                      getRandomPosition().x
                    ],
                    y: [
                      getRandomPosition().y,
                      getRandomPosition().y,
                      getRandomPosition().y
                    ],
                    rotate: [0, 360, 0],
                    scale: [0.8, 1.1, 0.9, 1.0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  <span className="break-words text-center block leading-tight">
                    {term.text}
                  </span>
                </motion.div>
              ))}

              {/* Resolution animation */}
              {isResolved && (
                <>
                  {/* Terms organizing into clean pathway */}
                  {floatingTerms.map((term, index) => (
                    <motion.div
                      key={`resolved-${index}`}
                      className="absolute bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-sm text-xs sm:text-sm font-medium text-gray-700 border border-gray-200 max-w-[100px] sm:max-w-[140px]"
                      initial={getRandomPosition()}
                      animate={{
                        x: Math.min(20 + (index * 25), containerDimensions.width - 120),
                        y: Math.min(150 + (index % 2) * 25, containerDimensions.height - 60),
                        opacity: 1,
                        scale: 0.8,
                        rotate: 0
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                        delay: index * 0.1
                      }}
                    >
                      <span className="break-words text-center block leading-tight">
                        {term.text}
                      </span>
                    </motion.div>
                  ))}

                  {/* Arrow pointing to solution */}
                  <motion.div
                    className="absolute right-12 sm:right-20 top-1/2 transform -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                  </motion.div>

                  {/* Zenethe solution box */}
                  <motion.div
                    className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 sm:p-4 rounded-xl shadow-lg max-w-[100px] sm:max-w-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm leading-tight">AI RAG Engine</h4>
                        <p className="text-xs opacity-90 leading-tight">Instant Clarity</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-4">
              Ready to Transform Your Medical Practice?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Experience how Zenethe's AI RAG technology turns information chaos into clinical clarity for doctors.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('guided-clinical-simulation')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              Experience AI RAG Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}