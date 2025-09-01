"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Scan, BarChart, Download } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Upload road images or videos through our intuitive interface",
      step: "01",
    },
    {
      icon: Scan,
      title: "AI Analysis",
      description: "YOLO and OpenCV models process the image simultaneously",
      step: "02",
    },
    {
      icon: BarChart,
      title: "Results Comparison",
      description: "Compare detection accuracy and performance metrics",
      step: "03",
    },
    {
      icon: Download,
      title: "Export Report",
      description: "Download detailed analysis reports and detection data",
      step: "04",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-accent">SmoothTrack</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple 4-step process to analyze road conditions using advanced AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                {step.step}
              </div>
              <div className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="animate-pulse-glow">
            Try SmoothTrack Now
          </Button>
        </div>
      </div>
    </section>
  )
}
