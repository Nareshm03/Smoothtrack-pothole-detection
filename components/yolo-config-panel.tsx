"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Settings, Target, Zap, Info } from "lucide-react"

interface YOLOConfigPanelProps {
  onConfigChange?: (config: any) => void
}

export function YOLOConfigPanel({ onConfigChange }: YOLOConfigPanelProps) {
  const [config, setConfig] = useState({
    confidenceThreshold: 0.5,
    nmsThreshold: 0.4,
    enableNMS: true,
    enableSeverityClassification: true,
    batchProcessing: false,
  })

  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    onConfigChange?.(newConfig)
  }

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-primary">YOLO Configuration</h3>
        <Badge className="bg-primary/10 text-primary">v8n</Badge>
      </div>

      <div className="space-y-6">
        {/* Model Information */}
        <div className="p-4 bg-background/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Model Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Version:</span>
              <span className="ml-2 font-medium">YOLOv8n-pothole</span>
            </div>
            <div>
              <span className="text-muted-foreground">Input Size:</span>
              <span className="ml-2 font-medium">640×640</span>
            </div>
            <div>
              <span className="text-muted-foreground">Classes:</span>
              <span className="ml-2 font-medium">4 types</span>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="ml-2 font-medium text-primary">89%</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Detection Parameters */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-accent" />
            <span className="font-medium">Detection Parameters</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Confidence Threshold: {config.confidenceThreshold.toFixed(2)}
              </Label>
              <Slider
                value={[config.confidenceThreshold]}
                onValueChange={([value]) => updateConfig("confidenceThreshold", value)}
                max={1}
                min={0.1}
                step={0.05}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum confidence score for detections</p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">NMS Threshold: {config.nmsThreshold.toFixed(2)}</Label>
              <Slider
                value={[config.nmsThreshold]}
                onValueChange={([value]) => updateConfig("nmsThreshold", value)}
                max={1}
                min={0.1}
                step={0.05}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">Non-Maximum Suppression overlap threshold</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Processing Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-chart-4" />
            <span className="font-medium">Processing Options</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Non-Maximum Suppression</Label>
                <p className="text-xs text-muted-foreground">Remove overlapping detections</p>
              </div>
              <Switch checked={config.enableNMS} onCheckedChange={(checked) => updateConfig("enableNMS", checked)} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Severity Classification</Label>
                <p className="text-xs text-muted-foreground">Classify pothole severity levels</p>
              </div>
              <Switch
                checked={config.enableSeverityClassification}
                onCheckedChange={(checked) => updateConfig("enableSeverityClassification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Batch Processing</Label>
                <p className="text-xs text-muted-foreground">Process multiple images simultaneously</p>
              </div>
              <Switch
                checked={config.batchProcessing}
                onCheckedChange={(checked) => updateConfig("batchProcessing", checked)}
              />
            </div>
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
              <div className="text-lg font-bold text-primary">1.2s</div>
              <div className="text-xs text-muted-foreground">Avg. Processing</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">0.83</div>
              <div className="text-xs text-muted-foreground">FPS</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-chart-4">92%</div>
              <div className="text-xs text-muted-foreground">Precision</div>
            </div>
            <div className="p-3 bg-background/50 rounded-lg text-center">
              <div className="text-lg font-bold text-chart-2">87%</div>
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
