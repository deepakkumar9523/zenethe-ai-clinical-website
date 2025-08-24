"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  MessageSquare, 
  Users, 
  Shield, 
  Brain,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  Database,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Database,
    title: "AI RAG-Powered Medical Intelligence",
    description: "Advanced retrieval-augmented generation trained on comprehensive medical datasets",
    details: [
      "Real-time querying of 50M+ medical records",
      "Contextual understanding of complex cases", 
      "Instant access to peer-reviewed literature",
      "Multi-specialty knowledge synthesis"
    ],
    color: "blue"
  },
  {
    icon: Users,
    title: "Doctor Knowledge Network",
    description: "Collaborate and learn from real-world physician case studies",
    details: [
      "Anonymized doctor case sharing",
      "Physician community insights",
      "Specialty-specific practice patterns",
      "Medical professional collaboration platform"
    ],
    color: "green"
  },
  {
    icon: Shield,
    title: "AI-Powered Safety Validation",
    description: "Comprehensive drug-drug and drug-disease interaction analysis",
    details: [
      "Real-time interaction screening",
      "Patient-specific risk assessment",
      "Alternative treatment suggestions",
      "Safety alert notifications for doctors"
    ],
    color: "red"
  }
]

const additionalFeatures = [
  {
    icon: Brain,
    title: "Advanced AI RAG Engine",
    description: "Machine learning algorithms trained on millions of doctor cases and medical literature"
  },
  {
    icon: Search,
    title: "Smart Medical Search",
    description: "Semantic search across vast medical databases tailored for physician workflows"
  },
  {
    icon: Clock,
    title: "Real-time Dataset Updates",
    description: "Continuous monitoring of new research and medical guideline changes"
  },
  {
    icon: Database,
    title: "Comprehensive Medical Dataset",
    description: "Access to 50M+ peer-reviewed articles and clinical guidelines for doctors"
  },
  {
    icon: Zap,
    title: "Lightning Fast RAG Processing",
    description: "Sub-second response times for critical medical decision support"
  },
  {
    icon: CheckCircle,
    title: "Evidence-Based for Doctors",
    description: "Every recommendation backed by verified medical evidence and datasets"
  }
]

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-500',
          text: 'text-blue-600'
        }
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'bg-green-500',
          text: 'text-green-600'
        }
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'bg-red-500',
          text: 'text-red-600'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'bg-gray-500',
          text: 'text-gray-600'
        }
    }
  }

  return (
    <section ref={ref} id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Database className="w-4 h-4" />
            <span>AI RAG Technology</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Built for Modern{" "}
            <span className="text-blue-500">Doctor's Practice</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three core AI RAG capabilities that transform how doctors access, analyze, 
            and apply medical knowledge from comprehensive datasets in real-world practice.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colors = getColorClasses(feature.color)
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className={`h-full hover:shadow-xl transition-all duration-300 hover:scale-105 ${colors.bg} ${colors.border} border-2`}>
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-display font-bold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
            Everything Doctors Need for Medical Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 hover:bg-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Ready to Experience the Future of AI RAG for Doctors?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of doctors who trust Zenethe's AI RAG technology for evidence-based medical insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const element = document.getElementById('guided-clinical-simulation')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Try AI RAG Demo
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('pricing')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                >
                  View Doctor Plans
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}