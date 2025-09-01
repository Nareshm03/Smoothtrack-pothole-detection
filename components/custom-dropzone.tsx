"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomDropzoneProps {
  onFilesAccepted: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  className?: string
}

export function CustomDropzone({
  onFilesAccepted,
  accept = "image/*",
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = "",
}: CustomDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    processFiles(selectedFiles)
  }

  const processFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large`)
        return false
      }
      if (accept && !file.type.match(accept.replace("*", ".*"))) {
        console.warn(`File ${file.name} is not accepted`)
        return false
      }
      return true
    })

    if (multiple) {
      setFiles((prev) => [...prev, ...validFiles])
      onFilesAccepted([...files, ...validFiles])
    } else {
      setFiles(validFiles.slice(0, 1))
      onFilesAccepted(validFiles.slice(0, 1))
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesAccepted(newFiles)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragOver
              ? "border-primary bg-primary/5 scale-105"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">{isDragOver ? "Drop files here" : "Drag & drop files here"}</p>
        <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
        <Button variant="outline" type="button">
          Choose Files
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div className="flex items-center space-x-3">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
