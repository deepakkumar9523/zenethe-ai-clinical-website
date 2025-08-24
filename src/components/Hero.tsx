"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Brain, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  Database
} from "lucide-react"

interface HeroProps {
  className?: string
  onCTAClick?: () => void
  onPricingClick?: () => void
}

const AIVisualization = () => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const steps = [
    { icon: Database, label: "Querying medical database", color: "text-blue-500" },
    { icon: Brain, label: "AI RAG processing", color: "text-green-500" },
    { icon: Activity, label: "Evidence synthesis", color: "text-orange-500" },
    { icon: CheckCircle, label: "Clinical insights ready", color: "text-emerald-500" }
  ]

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        
        return (
          <motion.div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
              isActive ? 'bg-primary/10 border border-primary/20' : 
              isCompleted ? 'bg-green-50 border border-green-200' : 
              'bg-gray-50 border border-gray-200'
            }`}
            animate={{
              scale: isActive ? 1.02 : 1,
              opacity: isActive ? 1 : 0.7
            }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive ? 'bg-primary text-white' :
              isCompleted ? 'bg-green-500 text-white' :
              'bg-gray-300 text-gray-600'
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium ${
              isActive ? 'text-primary' :
              isCompleted ? 'text-green-700' :
              'text-gray-600'
            }`}>
              {step.label}
            </span>
            {isActive && (
              <motion.div
                className="ml-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
              </motion.div>
            )}
            {isCompleted && (
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

const MetricsDisplay = () => {
  const metrics = [
    { label: "Response Time", value: "< 2s", trend: "+15%", icon: Clock },
    { label: "Accuracy Rate", value: "99.2%", trend: "+2.1%", icon: TrendingUp },
    { label: "Doctors Using", value: "12.8K", trend: "+28%", icon: Users }
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-4 h-4 text-primary" />
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                {metric.trend}
              </Badge>
            </div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Hero({ className, onCTAClick, onPricingClick }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleCTAClick = () => {
    const element = document.getElementById('guided-clinical-simulation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    onCTAClick?.()
  }

  const handlePricingClick = () => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    onPricingClick?.()
  }

  return (
    <section 
      id="hero"
      className={`relative min-h-screen bg-white flex items-center pt-24 ${className || ''}`}
      ref={ref}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Database className="w-4 h-4" />
                <span>Powered by AI RAG & Curated Medical Dataset</span>
                <Badge className="bg-blue-100 text-blue-800 text-xs">Advanced</Badge>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tight text-gray-900 leading-none">
                Your AI-Powered{" "}
                <span className="text-primary">Doctor's Companion</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Harness the power of AI RAG technology trained on comprehensive medical datasets. 
                Get instant, evidence-based clinical insights that enhance your diagnostic accuracy 
                and treatment decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                onClick={handleCTAClick}
              >
                Experience AI RAG Demo
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="text-gray-700 border-gray-300 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                onClick={handlePricingClick}
              >
                View Plans for Doctors
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex items-center space-x-6 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Trusted by Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-purple-500" />
                <span>50M+ Medical Records</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - AI Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <Card className="p-6 lg:p-8 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Zenethe AI RAG Engine</h3>
                      <p className="text-sm text-gray-500">Real-time Medical Intelligence</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Live</Badge>
                </div>

                {/* AI Process Visualization */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">AI RAG Processing Patient Data</h4>
                  <AIVisualization />
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Metrics</h4>
                  <MetricsDisplay />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">Dataset: Continuously Updated</span>
                  </div>
                  <div className="text-sm text-gray-500 font-mono">
                    Last sync: now
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-100"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-medium text-gray-700">Drug Interaction Alert</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-primary p-3 rounded-lg shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white">Evidence-Based Recommendation</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}