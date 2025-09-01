"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Cpu, Clock, TrendingUp, Zap } from "lucide-react"

interface SystemMetrics {
  timestamp: number
  cpuUsage: number
  memoryUsage: number
  processingSpeed: number
  queueLength: number
  throughput: number
}

export function RealTimeMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [currentMetrics, setCurrentMetrics] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    processingSpeed: 0,
    queueLength: 0,
    throughput: 0,
  })

  useEffect(() => {
    // Simulate real-time metrics
    const interval = setInterval(() => {
      const newMetric: SystemMetrics = {
        timestamp: Date.now(),
        cpuUsage: Math.random() * 80 + 20, // 20-100%
        memoryUsage: Math.random() * 60 + 30, // 30-90%
        processingSpeed: Math.random() * 2 + 0.5, // 0.5-2.5 FPS
        queueLength: Math.floor(Math.random() * 10), // 0-9 jobs
        throughput: Math.random() * 50 + 10, // 10-60 images/hour
      }

      setMetrics((prev) => [...prev.slice(-19), newMetric]) // Keep last 20 points
      setCurrentMetrics({
        cpuUsage: newMetric.cpuUsage,
        memoryUsage: newMetric.memoryUsage,
        processingSpeed: newMetric.processingSpeed,
        queueLength: newMetric.queueLength,
        throughput: newMetric.throughput,
      })
      setIsConnected(true)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const chartData = metrics.map((metric, index) => ({
    time: index,
    cpu: metric.cpuUsage,
    memory: metric.memoryUsage,
    speed: metric.processingSpeed * 20, // Scale for visibility
    queue: metric.queueLength * 10, // Scale for visibility
  }))

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className={`h-5 w-5 ${isConnected ? "text-chart-4" : "text-muted-foreground"}`} />
            <span className="font-medium">Real-time Monitoring</span>
          </div>
          <Badge className={isConnected ? "bg-chart-4/10 text-chart-4" : "bg-muted text-muted-foreground"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </Card>

      {/* Current Metrics */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center space-x-3">
            <Cpu className="h-6 w-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-primary">{currentMetrics.cpuUsage.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">CPU Usage</div>
            </div>
          </div>
          <Progress value={currentMetrics.cpuUsage} className="mt-2 h-1" />
        </Card>

        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-accent" />
            <div>
              <div className="text-2xl font-bold text-accent">{currentMetrics.memoryUsage.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Memory</div>
            </div>
          </div>
          <Progress value={currentMetrics.memoryUsage} className="mt-2 h-1" />
        </Card>

        <Card className="p-4 bg-chart-4/5 border-chart-4/20">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-chart-4" />
            <div>
              <div className="text-2xl font-bold text-chart-4">{currentMetrics.processingSpeed.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">FPS</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-chart-2/5 border-chart-2/20">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-chart-2" />
            <div>
              <div className="text-2xl font-bold text-chart-2">{currentMetrics.queueLength}</div>
              <div className="text-sm text-muted-foreground">Queue</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-chart-5/5 border-chart-5/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-chart-5" />
            <div>
              <div className="text-2xl font-bold text-chart-5">{currentMetrics.throughput.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Images/hr</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" strokeWidth={2} name="CPU Usage (%)" />
              <Line
                type="monotone"
                dataKey="memory"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                name="Memory Usage (%)"
              />
              <Line
                type="monotone"
                dataKey="speed"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                name="Processing Speed (x20)"
              />
              <Line
                type="monotone"
                dataKey="queue"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Queue Length (x10)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Processing Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Processing Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Performance Optimization</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">YOLO Processing:</span>
                <span className="font-medium">Optimized</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">OpenCV Pipeline:</span>
                <span className="font-medium">Efficient</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Memory Usage:</span>
                <span className="font-medium">Normal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Queue Management:</span>
                <span className="font-medium">Active</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">System Health</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Response Time:</span>
                <span className="font-medium text-chart-4">Fast</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Error Rate:</span>
                <span className="font-medium text-chart-4">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="font-medium text-chart-4">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Load Balancing:</span>
                <span className="font-medium text-chart-4">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
