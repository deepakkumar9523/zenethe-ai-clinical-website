"use client"

import React, { useState } from 'react'
import { Check, Info, Zap, Users, Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface PricingProps {
  className?: string
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual practitioners',
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: false,
    icon: Zap,
    features: [
      'AI-powered clinical analysis',
      'Basic drug interaction checks',
      'Evidence-based recommendations',
      'Email support',
      'Mobile app access',
      '100 queries per month'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Most popular for medical teams',
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    icon: Users,
    features: [
      'Everything in Starter',
      'Advanced clinical simulations',
      'Team collaboration tools',
      'Priority support',
      'Custom safety protocols',
      'Unlimited queries',
      'Advanced analytics',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For hospitals and large practices',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    popular: false,
    icon: Building,
    features: [
      'Everything in Professional',
      'White-label solution',
      'SSO integration',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security controls',
      'Bulk user management',
      'On-premise deployment option'
    ]
  }
]

export default function Pricing({ className }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const yearlyEquivalent = monthlyPrice * 12
    const savings = Math.round(((yearlyEquivalent - yearlyPrice) / yearlyEquivalent) * 100)
    return savings
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setShowSignUpForm(true)
    toast.success('Plan selected! Complete your sign-up below.')
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const plan = plans.find(p => p.id === selectedPlan)
    toast.success(`Welcome! We'll send ${plan?.name} setup instructions to ${email}`)
    setEmail('')
    setIsSubmitting(false)
    setShowSignUpForm(false)
    setSelectedPlan(null)
  }

  return (
    <div className={`${className} bg-white`}>
      {/* Billing Toggle */}
      <div className="flex flex-col items-center space-y-6 mb-12">
        <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              !isYearly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
              isYearly 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            {isYearly && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                Save 17%
              </Badge>
            )}
          </button>
        </div>
        
        {isYearly && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
              🎉 Save up to 17% with yearly billing
            </p>
          </motion.div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
          const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice)
          const isSelected = selectedPlan === plan.id
          const Icon = plan.icon

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <Card 
                className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-[1.02]' 
                    : 'hover:shadow-lg border-gray-200'
                } ${
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`text-center pb-4 ${plan.popular ? 'bg-blue-50' : 'bg-gray-50'} rounded-t-lg`}>
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-display font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold font-display text-gray-900">
                        ${price}
                      </span>
                      <span className="text-gray-600 ml-2 text-lg">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    
                    {isYearly && savings > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3"
                      >
                        <Badge className="bg-green-100 text-green-800 border border-green-200">
                          Save {savings}% annually
                        </Badge>
                      </motion.div>
                    )}
                    
                    {!isYearly && (
                      <p className="text-sm text-gray-500 mt-2">
                        ${plan.yearlyPrice}/year if paid annually
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6 pb-8 px-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      >
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    } ${isSelected ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
                    disabled={isSelected}
                  >
                    {isSelected ? 'Selected' : 'Start Free Trial'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    14-day free trial • No credit card required
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Sign-up Form */}
      <AnimatePresence>
        {showSignUpForm && selectedPlan && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="max-w-md mx-auto text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-2 text-gray-900">
                    Start Your Free Trial
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get started with {plans.find(p => p.id === selectedPlan)?.name} plan
                  </p>
                  
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        type="submit" 
                        className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Starting Trial...' : 'Start Free Trial'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="px-6 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          setShowSignUpForm(false)
                          setSelectedPlan(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>14-day free trial</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>No credit card</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Cancel anytime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Information */}
      <div className="mt-12 text-center space-y-6">
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-2 text-gray-700 mb-4">
            <Info className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Need a custom solution?</span>
          </div>
          <p className="text-gray-600 mb-4">
            We offer tailored pricing for large healthcare organizations, research institutions, and government agencies.
          </p>
          <Button 
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={() => toast.info('Contact us at enterprise@zenethe.com for custom pricing')}
          >
            Contact Sales Team
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
          <p>
            All plans include HIPAA compliance, end-to-end encryption, and access to our evidence-based medical database. 
            Pre-launch pricing is available until official release. Cancel anytime during the trial period with no charges.
          </p>
        </div>
      </div>
    </div>
  )
}