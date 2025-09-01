"use client"

import { useState, useCallback, useEffect } from "react"
import { CustomDropzone } from "@/components/custom-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Loader2, MapPin, MapPinOff } from "lucide-react"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  onProcessingStart: () => void
  onResults: (yolo: any, opencv: any, analysis: any) => void
}

export function ImageUpload({ onImageUpload, onProcessingStart, onResults }: ImageUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [gpsLocation, setGpsLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [gpsError, setGpsError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setGpsError(null)
        },
        (error) => {
          setGpsError("GPS access denied or unavailable")
          console.log("GPS error:", error.message)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
      )
    } else {
      setGpsError("GPS not supported by browser")
    }
  }, [])

  const handleFilesAccepted = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setUploadedFile(file)
        const imageUrl = URL.createObjectURL(file)
        onImageUpload(imageUrl)
      }
    },
    [onImageUpload],
  )

  const processImage = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    onProcessingStart()
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const formData = new FormData()
      formData.append("image", uploadedFile)

      if (gpsLocation) {
        formData.append("latitude", gpsLocation.latitude.toString())
        formData.append("longitude", gpsLocation.longitude.toString())
      }

      // Process with both YOLO and OpenCV
      const [yoloResponse, opencvResponse] = await Promise.all([
        fetch("/api/detect/yolo", {
          method: "POST",
          body: formData,
        }),
        fetch("/api/detect/opencv", {
          method: "POST",
          body: formData,
        }),
      ])

      const yoloResults = await yoloResponse.json()
      const opencvResults = await opencvResponse.json()

      // Get analysis comparison
      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yoloResults,
          opencvResults,
        }),
      })

      const analysis = await analysisResponse.json()

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        onResults(yoloResults, opencvResults, analysis)
        setIsProcessing(false)
        setProgress(0)
      }, 500)
    } catch (error) {
      console.error("Processing error:", error)
      setIsProcessing(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-4">
      <CustomDropzone
        onFilesAccepted={handleFilesAccepted}
        accept="image/*"
        multiple={false}
        className={uploadedFile ? "border-accent bg-accent/5" : ""}
      />

      {uploadedFile && (
        <Card className="p-4 bg-accent/5 border-accent">
          <div className="text-center space-y-2">
            <p className="font-medium text-accent">{uploadedFile.name}</p>
            <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </Card>
      )}

      <Card className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {gpsLocation ? (
              <MapPin className="h-4 w-4 text-green-500" />
            ) : (
              <MapPinOff className="h-4 w-4 text-gray-400" />
            )}
            <span className="text-sm font-medium">GPS Location</span>
          </div>
          <div className="text-right">
            {gpsLocation ? (
              <div className="text-xs text-green-600">
                <div>{gpsLocation.latitude.toFixed(6)}</div>
                <div>{gpsLocation.longitude.toFixed(6)}</div>
              </div>
            ) : (
              <span className="text-xs text-gray-500">{gpsError || "Getting location..."}</span>
            )}
          </div>
        </div>
      </Card>

      {uploadedFile && (
        <Button onClick={processImage} disabled={isProcessing} className="w-full animate-pulse-glow" size="lg">
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start AI Detection
            </>
          )}
        </Button>
      )}

      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Processing Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  )
}
