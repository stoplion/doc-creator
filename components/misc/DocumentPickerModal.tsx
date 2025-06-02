"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Briefcase,
  Calendar,
  CreditCard,
  FileBarChart,
  FileText,
  GraduationCap,
  Heart,
  ImageIcon,
  Mail,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"

interface DocumentType {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  category: string
  color: string
}

const documentTypes: DocumentType[] = [
  {
    id: 1,
    name: "Resume",
    description: "Professional resume and CV documents",
    icon: <FileText className="h-8 w-8" />,
    category: "professional",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Business Card",
    description: "Professional business cards and contact info",
    icon: <CreditCard className="h-8 w-8" />,
    category: "business",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Restaurant Menu",
    description: "Food menus and restaurant listings",
    icon: <UtensilsCrossed className="h-8 w-8" />,
    category: "hospitality",
    color: "bg-orange-500",
  },
  {
    id: 4,
    name: "Cover Letter",
    description: "Professional cover letters and applications",
    icon: <Briefcase className="h-8 w-8" />,
    category: "professional",
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Academic CV",
    description: "Academic curriculum vitae and research profiles",
    icon: <GraduationCap className="h-8 w-8" />,
    category: "academic",
    color: "bg-indigo-500",
  },
  {
    id: 6,
    name: "Wedding Invitation",
    description: "Wedding invitations and event announcements",
    icon: <Heart className="h-8 w-8" />,
    category: "personal",
    color: "bg-pink-500",
  },
  {
    id: 7,
    name: "Event Flyer",
    description: "Event promotions and announcements",
    icon: <Calendar className="h-8 w-8" />,
    category: "marketing",
    color: "bg-yellow-500",
  },
  {
    id: 8,
    name: "Newsletter",
    description: "Email newsletters and communications",
    icon: <Mail className="h-8 w-8" />,
    category: "marketing",
    color: "bg-cyan-500",
  },
  {
    id: 9,
    name: "Portfolio",
    description: "Creative portfolios and showcases",
    icon: <ImageIcon className="h-8 w-8" />,
    category: "creative",
    color: "bg-red-500",
  },
  {
    id: 10,
    name: "Report",
    description: "Business reports and analytics documents",
    icon: <FileBarChart className="h-8 w-8" />,
    category: "business",
    color: "bg-emerald-500",
  },
  // Adding more items to demonstrate scrolling
  {
    id: 11,
    name: "Brochure",
    description: "Marketing brochures and product showcases",
    icon: <FileText className="h-8 w-8" />,
    category: "marketing",
    color: "bg-blue-500",
  },
  {
    id: 12,
    name: "Invoice",
    description: "Professional invoices and billing documents",
    icon: <CreditCard className="h-8 w-8" />,
    category: "business",
    color: "bg-purple-500",
  },
  {
    id: 13,
    name: "Presentation",
    description: "Slide decks and presentation documents",
    icon: <FileBarChart className="h-8 w-8" />,
    category: "business",
    color: "bg-green-500",
  },
  {
    id: 14,
    name: "Certificate",
    description: "Awards and certification documents",
    icon: <GraduationCap className="h-8 w-8" />,
    category: "professional",
    color: "bg-yellow-500",
  },
]

interface DocumentTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (docType: DocumentType) => void
}

export function DocumentTypeModal({
  isOpen,
  onClose,
  onSelect,
}: DocumentTypeModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to ensure the initial state is rendered
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    } else {
      setIsVisible(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 500) // Match this with the transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const filteredDocumentTypes = documentTypes.filter(
    (docType) =>
      docType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docType.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docType.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDocumentTypeSelect = (docType: DocumentType) => {
    onSelect(docType)
    onClose()
  }

  if (!shouldRender) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-700 transition-all duration-500 ease-out flex flex-col transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ height: "100vh" }}
      >
        {/* Header - Fixed at top */}
        <div className="border-b border-zinc-800 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Create New Document
              </h1>
              <p className="text-zinc-400 mt-1">
                Choose what type of document you'd like to create
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Search Box */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search document types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Document Types Grid - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 pb-[200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocumentTypes.map((docType) => (
              <Card
                key={docType.id}
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-all duration-200 cursor-pointer group hover:border-zinc-600"
                onClick={() => handleDocumentTypeSelect(docType)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div
                      className={`${docType.color} p-3 rounded-lg text-white flex-shrink-0`}
                    >
                      {docType.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg group-hover:text-zinc-200 mb-1">
                        {docType.name}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {docType.description}
                      </p>
                      <div className="mt-3">
                        <span className="inline-block px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-md capitalize">
                          {docType.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredDocumentTypes.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No document types found
              </h3>
              <p className="text-zinc-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
