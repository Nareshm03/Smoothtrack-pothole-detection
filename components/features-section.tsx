"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Camera, BarChart3, Clock, Target, Cpu } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "State-of-the-art YOLOv8 architecture trained specifically for pothole detection with 89% accuracy",
      badge: "AI-Powered",
      color: "text-primary",
    },
    {
      icon: Camera,
      title: "Computer Vision",
      description: "Real-time image processing using OpenCV for edge detection and feature extraction",
      badge: "OpenCV",
      color: "text-accent",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive comparison between YOLO and OpenCV methods with detailed metrics",
      badge: "Analytics",
      color: "text-chart-4",
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Lightning-fast detection with processing times under 2 seconds per image",
      badge: "Fast",
      color: "text-chart-2",
    },
    {
      icon: Target,
      title: "High Precision",
      description: "Accurate bounding box detection with confidence scoring and severity classification",
      badge: "Precise",
      color: "text-chart-5",
    },
    {
      icon: Cpu,
      title: "Scalable Infrastructure",
      description: "Cloud-ready architecture supporting batch processing and API integration",
      badge: "Scalable",
      color: "text-chart-3",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cutting-Edge <span className="text-primary">AI Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging the latest advances in computer vision and deep learning for superior road infrastructure
            monitoring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg bg-primary/10 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
