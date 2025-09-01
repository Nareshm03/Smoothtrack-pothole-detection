"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { DetectionResults } from "@/components/detection-results"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { YOLOConfigPanel } from "@/components/yolo-config-panel"
import { OpenCVConfigPanel } from "@/components/opencv-config-panel"
import { PotholeDataTable } from "@/components/pothole-data-table"
import { ArrowLeft, Brain, Camera, BarChart3, Settings, Zap, Database } from "lucide-react"
import Link from "next/link"

interface DetectionData {
  yolo?: any
  opencv?: any
  analysis?: any
  isProcessing: boolean
  uploadedImage?: string
}

export function DetectionDashboard() {
  const [detectionData, setDetectionData] = useState<DetectionData>({
    isProcessing: false,
  })
  const [selectedPotholeId, setSelectedPotholeId] = useState<string | null>(null)

  const handlePotholeClick = (pothole: any) => {
    setSelectedPotholeId(pothole.id)
    // Scroll to detection results if needed
    const resultsElement = document.getElementById("detection-results")
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover-lift">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-primary">SmoothTrack Dashboard</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Pothole Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 animate-slide-in-right">
              <Link href="/realtime">
                <Button variant="outline" size="sm" className="animate-pulse-glow bg-transparent hover-lift">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Processing
                </Button>
              </Link>
              <Badge variant="secondary" className="bg-primary/10 text-primary animate-float">
                <Brain className="h-3 w-3 mr-1" />
                YOLO v8
              </Badge>
              <Badge
                variant="secondary"
                className="bg-accent/10 text-accent animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <Camera className="h-3 w-3 mr-1" />
                OpenCV
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6 animate-slide-in-left">
            <Card className="p-6 glass-effect hover-lift">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Detection Controls
              </h2>
              <ImageUpload
                onImageUpload={(imageUrl) => {
                  setDetectionData((prev) => ({ ...prev, uploadedImage: imageUrl }))
                }}
                onProcessingStart={() => {
                  setDetectionData((prev) => ({ ...prev, isProcessing: true }))
                }}
                onResults={(yolo, opencv, analysis) => {
                  setDetectionData({
                    yolo,
                    opencv,
                    analysis,
                    isProcessing: false,
                    uploadedImage: detectionData.uploadedImage,
                  })
                }}
              />
            </Card>

            <Card className="glass-effect hover-lift">
              <Tabs defaultValue="yolo" className="w-full">
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger value="yolo" className="focus-ring">
                    YOLO Config
                  </TabsTrigger>
                  <TabsTrigger value="opencv" className="focus-ring">
                    OpenCV Config
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="yolo" className="p-0 m-0">
                  <div className="p-4 pt-0">
                    <YOLOConfigPanel
                      onConfigChange={(config) => {
                        console.log("[v0] YOLO config updated:", config)
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="opencv" className="p-0 m-0">
                  <div className="p-4 pt-0">
                    <OpenCVConfigPanel
                      onConfigChange={(config) => {
                        console.log("[v0] OpenCV config updated:", config)
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {detectionData.isProcessing && (
              <Card className="p-6 glass-effect animate-fade-in-up animate-processing-pulse">
                <h3 className="text-lg font-semibold mb-4">Processing Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">YOLO Analysis</span>
                      <span className="text-sm text-primary animate-pulse">Running...</span>
                    </div>
                    <Progress value={75} className="h-2 processing-indicator" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">OpenCV Processing</span>
                      <span className="text-sm text-accent animate-pulse">Running...</span>
                    </div>
                    <Progress value={85} className="h-2 processing-indicator" />
                  </div>
                </div>
              </Card>
            )}

            {detectionData.analysis && (
              <Card className="p-6 glass-effect animate-fade-in-up hover-lift animate-detection-highlight">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-chart-4" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">YOLO Accuracy</span>
                    <span className="text-sm font-medium text-primary">
                      {detectionData.analysis?.accuracy?.yolo
                        ? (detectionData.analysis.accuracy.yolo * 100).toFixed(1)
                        : "0"}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">OpenCV Speed</span>
                    <span className="text-sm font-medium text-accent">
                      {detectionData.analysis?.processingSpeed?.opencv || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Detections Found</span>
                    <span className="text-sm font-medium">
                      {detectionData.analysis?.detectionCount?.yolo || 0} /{" "}
                      {detectionData.analysis?.detectionCount?.opencv || 0}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <Card className="p-6 glass-effect h-full hover-lift">
              <Tabs defaultValue="results" className="h-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="results" className="focus-ring">
                    Detection Results
                  </TabsTrigger>
                  <TabsTrigger value="data" className="focus-ring">
                    <Database className="h-4 w-4 mr-1" />
                    Data Table
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="focus-ring">
                    Model Comparison
                  </TabsTrigger>
                  <TabsTrigger value="metrics" className="focus-ring">
                    Performance Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="results" className="mt-6" id="detection-results">
                  <DetectionResults
                    yoloResults={detectionData.yolo}
                    opencvResults={detectionData.opencv}
                    uploadedImage={detectionData.uploadedImage}
                    isProcessing={detectionData.isProcessing}
                    selectedPotholeId={selectedPotholeId}
                  />
                </TabsContent>

                <TabsContent value="data" className="mt-6">
                  <PotholeDataTable
                    yoloDetections={detectionData.yolo?.detections || []}
                    opencvDetections={detectionData.opencv?.detections || []}
                    onPotholeClick={handlePotholeClick}
                    selectedPotholeId={selectedPotholeId}
                  />
                </TabsContent>

                <TabsContent value="comparison" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4 bg-primary/5 border-primary/20 hover-lift">
                      <h3 className="text-lg font-semibold text-primary mb-3">YOLO v8 Results</h3>
                      {detectionData.yolo ? (
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Detections:</span>{" "}
                            {detectionData.yolo.detections?.length || 0}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Processing Time:</span>{" "}
                            {detectionData.yolo.processingTime}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Model:</span> {detectionData.yolo.model}
                          </p>
                          {detectionData.yolo.metrics && (
                            <>
                              <p className="text-sm">
                                <span className="text-muted-foreground">Avg Confidence:</span>{" "}
                                {(detectionData.yolo.metrics.averageConfidence * 100).toFixed(1)}%
                              </p>
                              <p className="text-sm">
                                <span className="text-muted-foreground">Processing FPS:</span>{" "}
                                {detectionData.yolo.metrics.processingFps}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="skeleton h-20 rounded"></div>
                      )}
                    </Card>

                    <Card className="p-4 bg-accent/5 border-accent/20 hover-lift">
                      <h3 className="text-lg font-semibold text-accent mb-3">OpenCV Results</h3>
                      {detectionData.opencv ? (
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Detections:</span>{" "}
                            {detectionData.opencv.detections?.length || 0}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Processing Time:</span>{" "}
                            {detectionData.opencv.processingTime}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Method:</span> {detectionData.opencv.method}
                          </p>
                          {detectionData.opencv.metrics && (
                            <>
                              <p className="text-sm">
                                <span className="text-muted-foreground">Avg Edge Strength:</span>{" "}
                                {(detectionData.opencv.metrics.averageEdgeStrength * 100).toFixed(1)}%
                              </p>
                              <p className="text-sm">
                                <span className="text-muted-foreground">Processing FPS:</span>{" "}
                                {detectionData.opencv.metrics.processingFps}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="skeleton h-20 rounded"></div>
                      )}
                    </Card>
                  </div>

                  {detectionData.analysis && (
                    <Card className="p-4 mt-6 bg-chart-4/5 border-chart-4/20 animate-fade-in-up hover-lift">
                      <h3 className="text-lg font-semibold text-chart-4 mb-3">Analysis Recommendation</h3>
                      <p className="text-sm">{detectionData.analysis.recommendation}</p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="metrics" className="mt-6">
                  <PerformanceMetrics
                    yoloResults={detectionData.yolo}
                    opencvResults={detectionData.opencv}
                    analysis={detectionData.analysis}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
