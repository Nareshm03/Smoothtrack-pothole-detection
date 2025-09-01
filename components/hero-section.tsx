"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Eye, Zap, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              SmoothTrack
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              AI-Powered Vision-Based Road Monitoring System
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced pothole detection using YOLO deep learning models and OpenCV computer vision for real-time
              infrastructure monitoring
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="group animate-pulse-glow">
                Start Detection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Computer Vision</h3>
              </div>
              <p className="text-muted-foreground">
                Advanced YOLO models for accurate real-time pothole detection with 89% accuracy
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-8 w-8 text-accent" />
                <h3 className="text-xl font-semibold">Real-time Processing</h3>
              </div>
              <p className="text-muted-foreground">
                Lightning-fast analysis with OpenCV baseline comparison for optimal performance
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-chart-4/20 hover:border-chart-4/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-chart-4" />
                <h3 className="text-xl font-semibold">Infrastructure Safety</h3>
              </div>
              <p className="text-muted-foreground">
                Proactive road monitoring to prevent accidents and optimize maintenance schedules
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
