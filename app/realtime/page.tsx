import { BatchProcessing } from "@/components/batch-processing"
import { RealTimeMonitor } from "@/components/real-time-monitor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Zap, Activity } from "lucide-react"
import Link from "next/link"

export default function RealTimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-primary">Real-time Processing</h1>
                <p className="text-sm text-muted-foreground">Batch processing and system monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <Tabs defaultValue="batch" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="batch" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Batch Processing</span>
              </TabsTrigger>
              <TabsTrigger value="monitor" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>System Monitor</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="batch" className="mt-6">
              <BatchProcessing />
            </TabsContent>

            <TabsContent value="monitor" className="mt-6">
              <RealTimeMonitor />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
