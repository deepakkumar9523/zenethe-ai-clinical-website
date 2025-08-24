"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Clock,
  Users,
  ExternalLink,
  Twitter,
  Linkedin,
  Github
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function FinalCtaFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Welcome to Zenethe! We'll notify you about early access.")
    setEmail("")
    setIsSubmitting(false)
  }

  const benefits = [
    { icon: CheckCircle, text: "14-day free trial" },
    { icon: Shield, text: "HIPAA compliant" },
    { icon: Clock, text: "Setup in minutes" },
    { icon: Users, text: "24/7 support" }
  ]

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#guided-clinical-simulation" },
      { name: "API Documentation", href: "#" }
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Status", href: "#" },
      { name: "Community", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "HIPAA Compliance", href: "#" }
    ]
  }

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "GitHub", icon: Github, href: "#" }
  ]

  return (
    <section className="bg-white">
      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">
              Transform Your Clinical Practice{" "}
              <span className="text-blue-200">Today</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of healthcare professionals who rely on Zenethe for 
              evidence-based clinical decision support. Start your free trial now.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 flex items-center gap-2 hover:scale-105 transition-all duration-200"
                >
                  {isSubmitting ? (
                    "Starting..."
                  ) : (
                    <>
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-blue-100">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl">Zenethe</span>
                  <p className="text-gray-400 text-sm">Clinical AI Assistant</p>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Empowering healthcare professionals with AI-driven clinical intelligence 
                for better patient outcomes and evidence-based decision making.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      {link.name}
                      {link.href === "#" && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      {link.name}
                      {link.href === "#" && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      {link.name}
                      {link.href === "#" && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
              
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1"
                    >
                      {link.name}
                      {link.href === "#" && <ExternalLink className="w-2 h-2" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <p>&copy; 2024 Zenethe. All rights reserved.</p>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>Made with ❤️ for healthcare professionals worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}