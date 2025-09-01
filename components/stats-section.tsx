"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, MapPin, Clock } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "89%",
      label: "Detection Accuracy",
      description: "Average accuracy across all road conditions",
      color: "text-primary",
    },
    {
      icon: Clock,
      value: "1.2s",
      label: "Processing Time",
      description: "Average time per image analysis",
      color: "text-accent",
    },
    {
      icon: MapPin,
      value: "50K+",
      label: "Images Processed",
      description: "Total road images analyzed",
      color: "text-chart-4",
    },
    {
      icon: Users,
      value: "95%",
      label: "User Satisfaction",
      description: "Infrastructure teams trust SmoothTrack",
      color: "text-chart-2",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven <span className="text-primary">Performance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real metrics from infrastructure monitoring deployments worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-8 text-center bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-105 group"
            >
              <div
                className={`mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-8 w-8" />
              </div>
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
