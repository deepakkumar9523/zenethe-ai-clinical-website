"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#trusted-sources", label: "Sources" },
    { href: "#pricing", label: "Pricing" },
  ]

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-sm ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-primary">
                Zenethe
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Doctor's AI Companion
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-sm px-2 py-1"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Get early access to Zenethe"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-foreground hover:bg-secondary"
                  aria-label="Open navigation menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-80 bg-white border-border"
                id="mobile-menu"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xl text-primary">
                        Zenethe
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        Doctor's AI Companion
                      </span>
                    </div>
                  </div>
                  
                  <nav className="flex-1 py-6" role="navigation" aria-label="Mobile navigation">
                    <div className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-200 py-3 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label={`Navigate to ${link.label} section`}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </nav>

                  <div className="border-t border-border pt-6 space-y-4">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Get early access to Zenethe"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}