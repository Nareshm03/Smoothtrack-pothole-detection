"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Github, Play } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <Card className="p-12 bg-card/50 backdrop-blur-sm border-primary/20 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform <span className="text-primary">Road Monitoring</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join infrastructure teams worldwide using SmoothTrack for proactive road maintenance and safety monitoring
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="group animate-pulse-glow">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
            <Button variant="ghost" size="lg" className="group">
              <Github className="mr-2 h-4 w-4" />
              View Source
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Enterprise Ready</h4>
              <p className="text-sm text-muted-foreground">Scalable API integration for large-scale deployments</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Open Source</h4>
              <p className="text-sm text-muted-foreground">Full source code available for customization</p>
            </div>
            <div className="p-4 bg-chart-4/5 rounded-lg border border-chart-4/20">
              <h4 className="font-semibold text-chart-4 mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Expert assistance for implementation and optimization</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
