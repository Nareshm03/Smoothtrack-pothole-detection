"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Target, Eye, AlertTriangle } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface DetectionResultsProps {
  yoloResults?: any
  opencvResults?: any
  uploadedImage?: string
  isProcessing: boolean
  selectedPotholeId?: string | null
}

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
  confidence: number
  severity: "low" | "medium" | "high" | "critical"
  class: string
  method: "yolo" | "opencv"
  id?: string
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case "low":
      return "#22c55e" // green
    case "medium":
      return "#f59e0b" // amber
    case "high":
      return "#ef4444" // red
    case "critical":
      return "#dc2626" // dark red
    default:
      return "#6b7280" // gray
  }
}

function getSeverityThickness(severity: string): number {
  switch (severity) {
    case "low":
      return 2
    case "medium":
      return 3
    case "high":
      return 4
    case "critical":
      return 5
    default:
      return 2
  }
}

function ImageWithBoundingBoxes({
  imageSrc,
  yoloDetections = [],
  opencvDetections = [],
  showYolo = true,
  showOpenCV = true,
  selectedPotholeId,
}: {
  imageSrc: string
  yoloDetections?: any[]
  opencvDetections?: any[]
  showYolo?: boolean
  showOpenCV?: boolean
  selectedPotholeId?: string | null
}) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current && imageLoaded) {
      const rect = imageRef.current.getBoundingClientRect()
      setImageDimensions({ width: rect.width, height: rect.height })
    }
  }, [imageLoaded])

  const handleImageLoad = () => {
    setImageLoaded(true)
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      setImageDimensions({ width: rect.width, height: rect.height })
    }
  }

  const allDetections: BoundingBox[] = [
    ...(showYolo
      ? yoloDetections.map((d: any) => ({
          ...d,
          method: "yolo" as const,
          severity: d.severity || "medium",
          confidence: d.confidence || 0.5,
          bbox: d.bbox || { x: 0, y: 0, width: 10, height: 10 },
        }))
      : []),
    ...(showOpenCV
      ? opencvDetections.map((d: any) => ({
          ...d,
          method: "opencv" as const,
          severity: d.severity || "medium",
          confidence: d.confidence || 0.5,
          bbox: d.bbox || { x: 0, y: 0, width: 10, height: 10 },
        }))
      : []),
  ]

  return (
    <div className="relative">
      <img
        ref={imageRef}
        src={imageSrc || "/placeholder.svg"}
        alt="Road analysis"
        className="w-full h-auto max-h-96 object-contain rounded-lg"
        onLoad={handleImageLoad}
      />

      {imageLoaded && imageDimensions.width > 0 && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
          style={{ maxHeight: "384px" }}
        >
          {allDetections.map((detection, index) => {
            const severity = detection.severity || "medium"
            const confidence = detection.confidence || 0.5
            const bbox = detection.bbox || { x: 0, y: 0, width: 10, height: 10 }
            const isSelected = selectedPotholeId === detection.id

            const color = getSeverityColor(severity)
            const thickness = getSeverityThickness(severity)

            // Scale from the original image size (1920x1080) to the displayed image size
            const originalImageSize = { width: 1920, height: 1080 }
            const scaleX = imageDimensions.width / originalImageSize.width
            const scaleY = imageDimensions.height / originalImageSize.height

            const x = bbox.x * scaleX
            const y = bbox.y * scaleY
            const width = bbox.width * scaleX
            const height = bbox.height * scaleY

            return (
              <g key={`${detection.method}-${index}`}>
                {isSelected && (
                  <rect
                    x={x - 5}
                    y={y - 5}
                    width={width + 10}
                    height={height + 10}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    strokeDasharray="10,5"
                    opacity={0.8}
                    className="animate-pulse"
                  />
                )}

                {/* Main bounding box */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="none"
                  stroke={color}
                  strokeWidth={isSelected ? thickness + 2 : thickness}
                  strokeDasharray={detection.method === "opencv" ? "5,5" : "none"}
                  opacity={isSelected ? 1.0 : 0.8}
                />

                {/* Intensity indicator (corner highlight) */}
                <rect
                  x={x}
                  y={y}
                  width={Math.min(width * 0.3, 20)}
                  height={Math.min(height * 0.3, 20)}
                  fill={color}
                  opacity={isSelected ? 0.8 : 0.6}
                />

                {/* Severity label */}
                <rect x={x} y={y - 25} width={width} height={20} fill={color} opacity={isSelected ? 1.0 : 0.9} rx={3} />
                <text x={x + 5} y={y - 10} fill="white" fontSize="12" fontWeight="bold" textAnchor="start">
                  {(severity || "medium").toUpperCase()} ({(confidence * 100).toFixed(0)}%)
                </text>

                {/* Method indicator */}
                <circle
                  cx={x + width - 10}
                  cy={y + 10}
                  r={6}
                  fill={detection.method === "yolo" ? "#3b82f6" : "#8b5cf6"}
                  opacity={isSelected ? 1.0 : 0.8}
                />
                <text x={x + width - 10} y={y + 14} fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">
                  {detection.method === "yolo" ? "Y" : "O"}
                </text>

                {isSelected && (
                  <circle
                    cx={x + width / 2}
                    cy={y + height / 2}
                    r={8}
                    fill="#3b82f6"
                    opacity={0.9}
                    className="animate-ping"
                  />
                )}
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}

export function DetectionResults({
  yoloResults,
  opencvResults,
  uploadedImage,
  isProcessing,
  selectedPotholeId,
}: DetectionResultsProps) {
  const [showYolo, setShowYolo] = useState(true)
  const [showOpenCV, setShowOpenCV] = useState(true)

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted/20 rounded-lg">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg font-medium">AI Models Processing...</p>
          <p className="text-sm text-muted-foreground">Analyzing image with YOLO and OpenCV</p>
        </div>
      </div>
    )
  }

  if (!uploadedImage) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted/20 rounded-lg border-2 border-dashed border-border">
        <div className="text-center space-y-4">
          <Eye className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">No Image Uploaded</p>
          <p className="text-sm text-muted-foreground">Upload an image to see detection results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-muted/10">
        <div className="space-y-4">
          {/* Toggle controls */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Detection Visualization</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showYolo}
                  onChange={(e) => setShowYolo(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium text-primary">YOLO</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOpenCV}
                  onChange={(e) => setShowOpenCV(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium text-accent">OpenCV</span>
              </label>
            </div>
          </div>

          {/* Image with bounding boxes */}
          <ImageWithBoundingBoxes
            imageSrc={uploadedImage}
            yoloDetections={yoloResults?.detections || []}
            opencvDetections={opencvResults?.detections || []}
            showYolo={showYolo}
            showOpenCV={showOpenCV}
            selectedPotholeId={selectedPotholeId}
          />

          <div className="flex items-center justify-center space-x-6 p-3 bg-background/50 rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Severity Levels:</div>
            {[
              { level: "low", color: "#22c55e", label: "Low" },
              { level: "medium", color: "#f59e0b", label: "Medium" },
              { level: "high", color: "#ef4444", label: "High" },
              { level: "critical", color: "#dc2626", label: "Critical" },
            ].map(({ level, color, label }) => (
              <div key={level} className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Detection Results */}
      {(yoloResults || opencvResults) && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* YOLO Results */}
          {yoloResults && (
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  YOLO Detection
                </h3>
                <Badge className="bg-primary/10 text-primary">{yoloResults.detections?.length || 0} found</Badge>
              </div>

              <div className="space-y-3">
                {yoloResults.detections?.map((detection: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 bg-background/50 rounded-lg border-l-4 transition-all ${
                      selectedPotholeId === detection.id ? "bg-blue-50 border-blue-200 shadow-md" : ""
                    }`}
                    style={{ borderLeftColor: getSeverityColor(detection.severity) }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium capitalize flex items-center">
                        <AlertTriangle
                          className="h-4 w-4 mr-1"
                          style={{ color: getSeverityColor(detection.severity) }}
                        />
                        {detection.class}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {(detection.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Position: {detection.bbox.x}, {detection.bbox.y}
                      </p>
                      <p>
                        Size: {detection.bbox.width} × {detection.bbox.height}
                      </p>
                      {detection.severity && (
                        <p>
                          Severity:{" "}
                          <span
                            className="capitalize font-medium"
                            style={{ color: getSeverityColor(detection.severity) }}
                          >
                            {detection.severity}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-primary/20">
                <p className="text-sm text-muted-foreground">
                  Processing Time: <span className="font-medium">{yoloResults.processingTime}</span>
                </p>
              </div>
            </Card>
          )}

          {/* OpenCV Results */}
          {opencvResults && (
            <Card className="p-6 bg-accent/5 border-accent/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  OpenCV Detection
                </h3>
                <Badge className="bg-accent/10 text-accent">{opencvResults.detections?.length || 0} found</Badge>
              </div>

              <div className="space-y-3">
                {opencvResults.detections?.map((detection: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 bg-background/50 rounded-lg border-l-4 transition-all ${
                      selectedPotholeId === detection.id ? "bg-blue-50 border-blue-200 shadow-md" : ""
                    }`}
                    style={{ borderLeftColor: getSeverityColor(detection.severity || "medium") }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium capitalize flex items-center">
                        <AlertTriangle
                          className="h-4 w-4 mr-1"
                          style={{ color: getSeverityColor(detection.severity || "medium") }}
                        />
                        {detection.class}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {(detection.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Position: {detection.bbox.x}, {detection.bbox.y}
                      </p>
                      <p>
                        Size: {detection.bbox.width} × {detection.bbox.height}
                      </p>
                      <p>Method: {detection.method}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-accent/20">
                <p className="text-sm text-muted-foreground">
                  Processing Time: <span className="font-medium">{opencvResults.processingTime}</span>
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
