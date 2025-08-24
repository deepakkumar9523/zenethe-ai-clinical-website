"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  User, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  AlertTriangle, 
  ExternalLink, 
  Mail, 
  Play,
  MessageSquare,
  Stethoscope,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  Search,
  Bot,
  Send,
  Loader2,
  Brain
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"

interface ChartEntry {
  id: string
  timestamp: string
  category: string
  content: string
  editable?: boolean
}

interface ChatMessage {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  sources?: string[]
}

interface SimulationStep {
  id: number
  title: string
  type: 'invitation' | 'query' | 'insight' | 'deepening' | 'safety' | 'conclusion'
}

const initialChartEntries: ChartEntry[] = [
  {
    id: "initial",
    timestamp: "14:30",
    category: "Presentation",
    content: "72 y/o male from Ghatshila presents with 3-day fever, jaundice, and altered sensorium. PMH: CKD Stage 3, CAD on Atorvastatin. Dengue NS1: Negative."
  }
]

const simulationSteps: SimulationStep[] = [
  { id: 0, title: "Welcome", type: "invitation" },
  { id: 1, title: "Clinical Query", type: "query" },
  { id: 2, title: "AI Insight", type: "insight" },
  { id: 3, title: "Deep Analysis", type: "deepening" },
  { id: 4, title: "Safety Check", type: "safety" },
  { id: 5, title: "Conclusion", type: "conclusion" }
]

export default function GuidedSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [chartEntries, setChartEntries] = useState<ChartEntry[]>(initialChartEntries)
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [animationIndex, setAnimationIndex] = useState(0)
  const chatDemoRef = useRef<HTMLDivElement>(null)

  // Animated chat demo messages
  const chatDemoMessages: ChatMessage[] = [
    {
      id: "demo-1",
      type: "user",
      content: "72 y/o male, fever + jaundice + altered sensorium, CKD history, Dengue NS1 negative. What are the differential diagnoses?",
      timestamp: new Date(),
    },
    {
      id: "demo-2", 
      type: "assistant",
      content: "Based on the clinical presentation and regional context, I'm analyzing several key differentials:\n\n• **Nipah-like encephalitis** - Recent regional cases reported\n• **Scrub Typhus** - High seasonal prevalence in Jharkhand\n• **Leptospirosis** - Monsoon exposure pattern\n• **Bacterial meningitis** - Cannot rule out completely\n\nGiven the CKD history, drug selection will be critical.",
      timestamp: new Date(),
      sources: ["PubMed", "ICMR Guidelines", "Regional Health Data"]
    },
    {
      id: "demo-3",
      type: "system",
      content: "🚨 **Safety Alert**: Potential drug interaction detected with current medications",
      timestamp: new Date(),
    },
    {
      id: "demo-4",
      type: "assistant",
      content: "**Recommended Treatment Approach:**\n\n✅ **Safe**: IV Doxycycline 100mg BID\n⚠️ **Avoid**: Azithromycin + Atorvastatin (rhabdomyolysis risk in CKD)\n\n**Action**: Hold statin therapy temporarily, monitor renal function closely.",
      timestamp: new Date(),
      sources: ["DOAJ", "MedlinePlus", "Drug Interaction Database"]
    }
  ]

  // Auto-cycle through demo messages
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % chatDemoMessages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [chatDemoMessages.length])

  const addChartEntry = (content: string, category: string = "Update") => {
    const now = new Date()
    const timestamp = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
    
    const newEntry: ChartEntry = {
      id: `entry-${Date.now()}`,
      timestamp,
      category,
      content,
      editable: true
    }
    
    setChartEntries(prev => [...prev, newEntry])
  }

  const handleQuerySelect = (query: string) => {
    setSelectedQuery(query)
    
    // Add exposure history to chart based on query
    if (query.includes("regional outbreaks")) {
      addChartEntry("Recent farm pig exposure documented. Lives near Mayurbhanj border area with recent Nipah-like cases.", "Exposure History")
    }
    
    setTimeout(() => setCurrentStep(2), 500)
  }

  const handleDeepAnalysis = () => {
    setCurrentStep(3)
    addChartEntry("ICMR guidance reviewed. Differential includes Scrub Typhus (high regional prevalence), Leptospirosis, Nipah virus.", "Clinical Analysis")
  }

  const handleSafetyCheck = () => {
    setShowAlert(true)
    setCurrentStep(4)
    addChartEntry("Drug interaction check completed. Statin therapy risk identified with proposed antimicrobials.", "Safety Alert")
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Early access request submitted! Check your email for next steps.")
    setEmail("")
    setIsSubmitting(false)
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput("")
    setIsChatLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'assistant',
        content: "Thank you for your question. This is a simulated response showing how Zenethe's AI would analyze your clinical query with evidence-based recommendations and safety checks.",
        timestamp: new Date(),
        sources: ["PubMed", "ICMR", "WHO Guidelines"]
      }
      setChatMessages(prev => [...prev, aiResponse])
      setIsChatLoading(false)
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 4) {
        setTimeout(() => setShowSignup(true), 1000)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Main Simulation Container */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
        {/* Patient Chart - Left Panel */}
        <div className="order-2 lg:order-1 w-full min-w-0">
          <div className="lg:sticky lg:top-8">
            <Card className="bg-white border border-gray-200 shadow-sm w-full">
              <CardHeader className="pb-4 bg-gray-50 rounded-t-lg p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg font-display text-gray-900 truncate">Patient Chart</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">Case ID: ZEN-2024-001</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                {chartEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 w-full"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{entry.timestamp}</span>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 px-2 py-1">
                        {entry.category}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words" tabIndex={0}>
                      {entry.content}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Zenethe Interface - Right Panel */}
        <div className="order-1 lg:order-2 w-full min-w-0">
          <Card className="bg-white border border-gray-200 shadow-sm min-h-[500px] sm:min-h-[600px] flex flex-col w-full">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg font-display text-gray-900 truncate">Zenethe Clinical AI</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600">Step {currentStep + 1} of {simulationSteps.length}</p>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="flex gap-1 flex-shrink-0">
                  {simulationSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      aria-label={`Step ${index + 1} ${index <= currentStep ? 'completed' : 'pending'}`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {/* Step 0: Invitation */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col justify-center text-center space-y-4 sm:space-y-6"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-display font-bold mb-3 text-gray-900">
                        Experience Clinical AI in Action
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Navigate a complex case with real-time insights, safety checks, and evidence-based guidance in under 60 seconds.
                      </p>
                    </div>
                    <Button
                      onClick={nextStep}
                      size="lg"
                      className="mx-auto flex items-center gap-2 bg-primary hover:bg-primary/90 text-sm sm:text-base px-4 sm:px-6"
                    >
                      <Play className="w-4 h-4" />
                      Begin Simulation
                    </Button>
                  </motion.div>
                )}

                {/* Step 1: Query Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-4 sm:space-y-6"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                        What would you like to explore first?
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Select a clinical query to get AI-powered insights.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        "Trending regional outbreaks matching this presentation?",
                        "Standard protocol for febrile jaundice with encephalopathy",
                        "Drug contraindications in CKD patients"
                      ].map((query, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full h-auto p-3 sm:p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors min-h-0"
                          onClick={() => handleQuerySelect(query)}
                        >
                          <Search className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0 text-primary" />
                          <span className="text-xs sm:text-sm leading-relaxed text-gray-700 break-words">{query}</span>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: First Insight */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-4 sm:space-y-6"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                        AI Analysis Complete
                      </h3>
                      <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                        <div className="flex items-start gap-3 mb-4">
                          <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold mb-2 text-gray-900 text-sm sm:text-base">Differential Considerations</h4>
                            <ul className="space-y-1 text-xs sm:text-sm text-gray-700">
                              <li className="break-words">• Nipah-like encephalitis (recent regional cases)</li>
                              <li className="break-words">• Scrub Typhus (high seasonal prevalence)</li>
                              <li className="break-words">• Leptospirosis (monsoon exposure pattern)</li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-2 py-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            PubMed
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 px-2 py-1">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            ICMR Guidelines
                          </Badge>
                        </div>
                        <Button
                          onClick={handleDeepAnalysis}
                          className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm px-3 py-2"
                          size="sm"
                        >
                          Reveal Related Exposures
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Deepening Inquiry */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-4 sm:space-y-6"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                        Context-Aware Actions
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Based on the updated patient information, explore these evidence-based options:
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full h-auto p-3 sm:p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-200 min-h-0"
                        onClick={handleSafetyCheck}
                      >
                        <FileText className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0 text-primary" />
                        <span className="text-xs sm:text-sm text-gray-700 break-words">Compare ICMR guidance for Nipah vs bacterial mimics</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-auto p-3 sm:p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-200 min-h-0"
                        onClick={handleSafetyCheck}
                      >
                        <Shield className="w-4 h-4 mr-2 sm:mr-3 flex-shrink-0 text-primary" />
                        <span className="text-xs sm:text-sm text-gray-700 break-words">Evidence for Ribavirin in suspected viral encephalitis</span>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Safety Alert */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-4 sm:space-y-6"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                        Clinical Guidance & Safety
                      </h3>
                    </div>

                    {showAlert && (
                      <Alert className="border-red-200 bg-red-50" role="alert" aria-live="assertive">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <AlertDescription className="min-w-0">
                          <div className="space-y-2">
                            <p className="font-semibold text-red-800 text-sm sm:text-base">Drug Interaction Alert</p>
                            <p className="text-xs sm:text-sm text-red-700 break-words">
                              <strong>Recommendation:</strong> IV Doxycycline 100mg BID for suspected rickettsial disease. 
                              Hold Atorvastatin due to potential hepatotoxicity interaction.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 border-red-200 text-red-700 hover:bg-red-50 text-xs px-2 py-1"
                              onClick={() => window.open('#', '_blank')}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Cite Sources
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Evidence Summary</h4>
                          <p className="text-xs sm:text-sm text-green-700 break-words">
                            Comprehensive drug interaction screening completed. Treatment plan optimized for patient safety with CKD considerations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button onClick={nextStep} className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm px-4 py-2">
                      Continue to Summary
                    </Button>
                  </motion.div>
                )}

                {/* Step 5: Conclusion & Signup */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-4 sm:space-y-6"
                  >
                    {!showSignup ? (
                      <div className="text-center space-y-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                            Case Resolved in Under 60 Seconds
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">
                            You just navigated a complex case with AI-powered insights, drug interaction checks, and evidence-based recommendations.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="text-center">
                          <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-gray-900">
                            Make This Your Everyday Advantage
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">
                            Join thousands of clinicians using Zenethe to deliver safer, faster care.
                          </p>
                        </div>

                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <div>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full border-gray-300 text-sm"
                              required
                              aria-label="Email address"
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm px-4 py-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Mail className="w-4 h-4 mr-2" />
                                Request Early Access
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-gray-500 text-center">
                            <a href="#pricing" className="underline hover:text-primary">View pricing</a> • Free trial available
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              {currentStep > 0 && currentStep < 5 && !showSignup && (
                <div className="flex justify-between items-center pt-4 sm:pt-6 border-t border-gray-100 mt-4 sm:mt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                  
                  {currentStep < 4 && (
                    <Button
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-xs sm:text-sm px-3 py-2"
                      disabled={currentStep === 1 && !selectedQuery}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive Chat Demo */}
      <Card className="bg-white border border-gray-200 shadow-sm mb-6 sm:mb-8 w-full overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg font-display flex items-center gap-3 text-gray-900">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <span className="truncate">Interactive Chat Demo</span>
          </CardTitle>
          <p className="text-xs sm:text-sm text-gray-600">Try the real-time chat interface</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Demo Messages Display */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 min-h-[200px] sm:min-h-[300px] max-h-[300px] sm:max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {chatDemoMessages.slice(0, animationIndex + 1).map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : message.type === 'system'
                      ? 'bg-orange-100 text-orange-800 border border-orange-200'
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  }`}>
                    <div className="whitespace-pre-line text-xs sm:text-sm break-words">
                      {message.content}
                    </div>
                    {message.sources && (
                      <div className="flex gap-1 sm:gap-2 mt-2 flex-wrap">
                        {message.sources.map((source) => (
                          <Badge key={source} variant="secondary" className="text-xs bg-blue-100 text-blue-700 px-1 sm:px-2 py-1">
                            <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            <span className="truncate">{source}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Interactive Chat */}
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  }`}>
                    <div className="whitespace-pre-line text-xs sm:text-sm break-words">
                      {message.content}
                    </div>
                    {message.sources && (
                      <div className="flex gap-1 sm:gap-2 mt-2 flex-wrap">
                        {message.sources.map((source) => (
                          <Badge key={source} variant="secondary" className="text-xs bg-blue-100 text-blue-700 px-1 sm:px-2 py-1">
                            <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            <span className="truncate">{source}</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 border border-gray-200 shadow-sm rounded-lg p-2 sm:p-3 max-w-[85%] sm:max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-500">Zenethe is analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a clinical question..."
              className="flex-1 border-gray-300 text-xs sm:text-sm min-w-0"
              disabled={isChatLoading}
            />
            <Button 
              type="submit" 
              disabled={!chatInput.trim() || isChatLoading}
              className="bg-primary hover:bg-primary/90 px-3 py-2 flex-shrink-0"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-2 text-center break-words">
            This is a demo interface. Actual responses will be more comprehensive and clinically accurate.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}