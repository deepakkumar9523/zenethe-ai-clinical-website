"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Shield, CheckCircle } from "lucide-react"

const sources = [
  { name: "PubMed", description: "National Library of Medicine", verified: true },
  { name: "DOAJ", description: "Directory of Open Access Journals", verified: true },
  { name: "ICMR", description: "Indian Council of Medical Research", verified: true },
  { name: "MoHFW", description: "Ministry of Health & Family Welfare", verified: true },
  { name: "MedlinePlus", description: "National Institutes of Health", verified: true },
  { name: "WHO", description: "World Health Organization", verified: true },
  { name: "Cochrane", description: "Cochrane Library", verified: true },
  { name: "UpToDate", description: "Clinical Decision Support", verified: true }
]

export default function TrustedSources() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="trusted-sources" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Trusted Medical Sources</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Evidence You Can{" "}
            <span className="text-blue-500">Trust</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Zenethe's AI queries rigorously curated, continuously updated medical sources 
            to ensure every insight is backed by verifiable, peer-reviewed evidence.
          </p>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50M+</h3>
            <p className="text-gray-600">Peer-reviewed articles indexed</p>
          </div>
          
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Source verification accuracy</p>
          </div>
          
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Real-time</h3>
            <p className="text-gray-600">Content updates and validation</p>
          </div>
        </motion.div>

        {/* Sources Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {sources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{source.name}</h3>
                {source.verified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {source.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Rigorous Quality Assurance
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Peer Review Validation</h4>
                    <p className="text-gray-600 text-sm">Every source undergoes multi-layer editorial review</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
                    <p className="text-gray-600 text-sm">Continuous monitoring for new guidelines and retractions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Conflict Detection</h4>
                    <p className="text-gray-600 text-sm">AI identifies and flags conflicting recommendations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  HIPAA Compliant
                </h4>
                <p className="text-gray-600 text-sm">
                  All data processing meets healthcare privacy standards with end-to-end encryption
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}