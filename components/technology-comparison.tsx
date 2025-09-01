"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Target, Zap } from "lucide-react"

export function TechnologyComparison() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">YOLO</span> vs <span className="text-accent">OpenCV</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare the performance of our advanced YOLO deep learning model against traditional OpenCV edge detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* YOLO Card */}
          <Card className="p-8 bg-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">YOLO v8</h3>
                <Badge className="bg-primary/10 text-primary">Deep Learning</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm text-primary">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm text-primary">1.2s</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Precision</span>
                  <span className="text-sm text-primary">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Advanced object detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Confidence scoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Severity classification</span>
                </div>
              </div>
            </div>
          </Card>

          {/* OpenCV Card */}
          <Card className="p-8 bg-accent/5 border-accent/20 hover:border-accent/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent">OpenCV</h3>
                <Badge className="bg-accent/10 text-accent">Edge Detection</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm text-accent">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm text-accent">0.8s</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Precision</span>
                  <span className="text-sm text-accent">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm">Ultra-fast processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm">Low computational cost</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm">Real-time baseline</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 bg-card/50 backdrop-blur-sm">
            <p className="text-lg font-medium mb-2">
              <span className="text-primary">Recommendation:</span> Use YOLO for maximum accuracy, OpenCV for speed
            </p>
            <p className="text-muted-foreground">
              SmoothTrack provides both methods for optimal flexibility in different scenarios
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
