"use client"

import { CheckCircle, FileText, Upload, XCircle } from "lucide-react"
import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { Button } from "../../../components/ui/button"

export function FileUploaderBox() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    if (!file.type.includes("pdf")) {
      setError("Please upload a PDF file")
      return false
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size should be less than 5MB")
      return false
    }

    return true
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
      className={`
          relative
          border-2 
          border-dashed 
          rounded-lg 
          p-6 
          bg-white/10
          transition-colors 
          ${isDragging ? "border-blue-400 bg-white/15" : "border-gray-500"} 
          ${error ? "border-red-400" : ""}
        `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
        id="resume-upload"
      />

      <div className="flex flex-col items-center justify-center text-center">
        {!file ? (
          <>
            <div className="mb-3 p-2 rounded-full bg-white/15">
              <FileText className="h-6 w-6 text-gray-200" />
            </div>
            <h3 className="text-base font-medium mb-2 text-white">
              Upload Resume
            </h3>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Drag and drop your resume PDF here, or click to browse
            </p>
            <Button
              onClick={handleButtonClick}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-gray-600 hover:bg-white/20"
            >
              <Upload className="h-3 w-3 mr-2" />
              Select PDF
            </Button>
            <p className="text-xs text-gray-400 mt-3">PDF only, max 5MB</p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between bg-white/15 p-3 rounded-md border border-gray-600">
              <div className="flex items-center min-w-0 flex-1">
                <FileText className="h-5 w-5 text-blue-300 mr-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-gray-300 hover:text-red-300 ml-2 flex-shrink-0"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center mt-3">
              <div className="flex items-center text-green-400">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-xs text-green-300">Ready to upload</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-900/30 border border-red-700 rounded text-red-300 text-xs">
          <div className="flex items-center">
            <XCircle className="h-3 w-3 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}
