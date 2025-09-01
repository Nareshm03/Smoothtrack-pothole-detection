"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock, Target, Zap, TrendingUp } from "lucide-react"

interface PerformanceMetricsProps {
  yoloResults?: any
  opencvResults?: any
  analysis?: any
}

export function PerformanceMetrics({ yoloResults, opencvResults, analysis }: PerformanceMetricsProps) {
  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg">
        <div className="text-center space-y-4">
          <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">No Metrics Available</p>
          <p className="text-sm text-muted-foreground">Process an image to see performance metrics</p>
        </div>
      </div>
    )
  }

  const yoloAccuracy = analysis.accuracy?.yolo ?? 0
  const opencvAccuracy = analysis.accuracy?.opencv ?? 0
  const yoloSpeed = analysis.processingSpeed?.yolo ?? "0s"
  const opencvSpeed = analysis.processingSpeed?.opencv ?? "0s"
  const yoloDetections = analysis.detectionCount?.yolo ?? 0
  const opencvDetections = analysis.detectionCount?.opencv ?? 0

  const chartData = [
    {
      name: "YOLO",
      accuracy: yoloAccuracy * 100,
      speed: Number.parseFloat(yoloSpeed.replace("s", "")),
      detections: yoloDetections,
    },
    {
      name: "OpenCV",
      accuracy: opencvAccuracy * 100,
      speed: Number.parseFloat(opencvSpeed.replace("s", "")),
      detections: opencvDetections,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-primary">{(yoloAccuracy * 100).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">YOLO Accuracy</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-accent" />
            <div>
              <p className="text-2xl font-bold text-accent">{opencvSpeed}</p>
              <p className="text-sm text-muted-foreground">OpenCV Speed</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-chart-4/5 border-chart-4/20">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-chart-4" />
            <div>
              <p className="text-2xl font-bold text-chart-4">{yoloDetections}</p>
              <p className="text-sm text-muted-foreground">YOLO Detections</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-chart-2/5 border-chart-2/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-chart-2" />
            <div>
              <p className="text-2xl font-bold text-chart-2">{opencvDetections}</p>
              <p className="text-sm text-muted-foreground">OpenCV Detections</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Comparison Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="hsl(var(--primary))" name="Accuracy %" />
              <Bar dataKey="detections" fill="hsl(var(--accent))" name="Detections" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">YOLO Accuracy</span>
              <span className="text-primary">{(yoloAccuracy * 100).toFixed(1)}%</span>
            </div>
            <Progress value={yoloAccuracy * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">OpenCV Accuracy</span>
              <span className="text-accent">{(opencvAccuracy * 100).toFixed(1)}%</span>
            </div>
            <Progress value={opencvAccuracy * 100} className="h-2" />
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Recommendation</h4>
            <p className="text-sm text-muted-foreground">{analysis.recommendation || "No recommendation available"}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
