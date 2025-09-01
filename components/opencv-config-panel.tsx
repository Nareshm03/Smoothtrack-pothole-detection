"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Camera, Settings, Zap, Info, Eye } from "lucide-react"

interface OpenCVConfigPanelProps {
  onConfigChange?: (config: any) => void
}

export function OpenCVConfigPanel({ onConfigChange }: OpenCVConfigPanelProps) {
  const [config, setConfig] = useState({
    method: "combined",
    cannyThreshold1: 50,
    cannyThreshold2: 150,
    sobelKernel: 3,
    gaussianBlur: 5,
    morphologyKernel: 5,
    minContourArea: 500,
    maxContourArea: 10000,
  })

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    onConfigChange?.(newConfig)
  }

  return (
    <Card className="p-6 bg-accent/5 border-accent/20">
      <div className="flex items-center space-x-3 mb-6">
        <Camera className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-semibold text-accent">OpenCV Configuration</h3>
        <Badge className="bg-accent/10 text-accent">Edge Detection</Badge>
      </div>

      <div className="space-y-6">
        {/* Method Information */}
        <div className="p-4 bg-background/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Method Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Current Method:</span>
              <span className="ml-2 font-medium capitalize">{config.method}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Processing:</span>
              <span className="ml-2 font-medium">Real-time</span>
            </div>
            <div>
              <span className="text-muted-foreground">Speed:</span>
              <span className="ml-2 font-medium text-accent">0.8s avg</span>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="ml-2 font-medium text-accent">65%</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Detection Method */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="font-medium">Detection Method</span>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Edge Detection Algorithm</Label>
            <Select value={config.method} onValueChange={(value) => updateConfig("method", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="canny">Canny Edge Detection</SelectItem>
                <SelectItem value="sobel">Sobel Gradient</SelectItem>
                <SelectItem value="laplacian">Laplacian Edge</SelectItem>
                <SelectItem value="combined">Combined Methods</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {config.method === "canny" && "Optimal edge detector with hysteresis thresholding"}
              {config.method === "sobel" && "Gradient-based detection for directional edges"}
              {config.method === "laplacian" && "Second derivative detection, rotation invariant"}
              {config.method === "combined" && "Multi-method approach for comprehensive detection"}
            </p>
          </div>
        </div>

        <Separator />

        {/* Canny Parameters */}
        {(config.method === "canny" || config.method === "combined") && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-chart-4" />
              <span className="font-medium">Canny Parameters</span>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Lower Threshold: {config.cannyThreshold1}</Label>
              <Slider
                value={[config.cannyThreshold1]}
                onValueChange={([value]) => updateConfig("cannyThreshold1", value)}
                max={200}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Upper Threshold: {config.cannyThreshold2}</Label>
              <Slider
                value={[config.cannyThreshold2]}
                onValueChange={([value]) => updateConfig("cannyThreshold2", value)}
                max={300}
                min={50}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Sobel Parameters */}
        {(config.method === "sobel" || config.method === "combined") && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-chart-2" />
              <span className="font-medium">Sobel Parameters</span>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Kernel Size: {config.sobelKernel}</Label>
              <Slider
                value={[config.sobelKernel]}
                onValueChange={([value]) => updateConfig("sobelKernel", value)}
                max={7}
                min={1}
                step={2}
                className="w-full"
              />
            </div>
          </div>
        )}

        <Separator />

        {/* Preprocessing Parameters */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-chart-5" />
            <span className="font-medium">Preprocessing</span>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Gaussian Blur: {config.gaussianBlur}</Label>
            <Slider
              value={[config.gaussianBlur]}
              onValueChange={([value]) => updateConfig("gaussianBlur", value)}
              max={15}
              min={1}
              step={2}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Min Contour Area: {config.minContourArea}</Label>
            <Slider
              value={[config.minContourArea]}
              onValueChange={([value]) => updateConfig("minContourArea", value)}
              max={2000}
              min={100}
              step={50}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Max Contour Area: {config.maxContourArea}</Label>
            <Slider
              value={[config.maxContourArea]}
              onValueChange={([value]) => updateConfig("maxContourArea", value)}
              max={20000}
              min={5000}
              step={500}
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Performance Metrics */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-chart-2" />
            <span className="font-medium">Performance Metrics</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">0.8s</div>
              <div className="text-xs text-muted-foreground">Avg. Processing</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-chart-2">1.25</div>
              <div className="text-xs text-muted-foreground">FPS</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-chart-4">68%</div>
              <div className="text-xs text-muted-foreground">Precision</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-chart-5">72%</div>
              <div className="text-xs text-muted-foreground">Recall</div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-transparent" variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </Card>
  )
}
