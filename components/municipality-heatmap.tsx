"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Map, Download, Calendar, TrendingUp, MapPin } from "lucide-react"

export function MunicipalityHeatmap() {
  const [timeFilter, setTimeFilter] = useState<string>("month")
  const [severityFilter, setSeverityFilter] = useState<string>("all")

  // Mock heatmap data
  const heatmapData = {
    totalHotspots: 23,
    criticalAreas: 5,
    mostAffectedWard: "Ward 12",
    trendDirection: "increasing",
  }

  const wardData = [
    { ward: "Ward 1", issues: 45, severity: "medium", trend: "+12%" },
    { ward: "Ward 2", issues: 23, severity: "low", trend: "-5%" },
    { ward: "Ward 3", issues: 67, severity: "high", trend: "+23%" },
    { ward: "Ward 4", issues: 34, severity: "medium", trend: "+8%" },
    { ward: "Ward 5", issues: 89, severity: "critical", trend: "+34%" },
    { ward: "Ward 6", issues: 12, severity: "low", trend: "-15%" },
    { ward: "Ward 7", issues: 56, severity: "high", trend: "+18%" },
    { ward: "Ward 8", issues: 78, severity: "critical", trend: "+28%" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pothole Heatmap</h2>
          <p className="text-muted-foreground">Visualize pothole hotspots across wards and cities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Map
          </Button>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4">
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical Only</option>
          <option value="high">High & Critical</option>
          <option value="medium">Medium & Above</option>
        </select>
      </div>

      {/* Heatmap Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Hotspots</p>
                <p className="text-2xl font-bold">{heatmapData.totalHotspots}</p>
              </div>
              <Map className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Areas</p>
                <p className="text-2xl font-bold text-red-600">{heatmapData.criticalAreas}</p>
              </div>
              <MapPin className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Most Affected</p>
                <p className="text-lg font-bold">{heatmapData.mostAffectedWard}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trend</p>
                <p className="text-lg font-bold capitalize">{heatmapData.trendDirection}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Heatmap Placeholder */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="h-5 w-5 mr-2" />
            Interactive Heatmap View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-96 flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center space-y-4">
              <Map className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Interactive Map Integration</h3>
                <p className="text-muted-foreground">
                  This would integrate with mapping services like Google Maps, Mapbox, or OpenStreetMap to display
                  real-time pothole hotspots with color-coded severity indicators.
                </p>
              </div>
              <Button variant="outline">
                <Map className="h-4 w-4 mr-2" />
                Load Interactive Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ward-wise Breakdown */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Ward-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {wardData.map((ward) => (
              <div key={ward.ward} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getSeverityColor(ward.severity)}`}></div>
                  <div>
                    <h4 className="font-medium">{ward.ward}</h4>
                    <p className="text-sm text-muted-foreground">{ward.issues} reported issues</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={`${getSeverityTextColor(ward.severity)} bg-transparent border`}>
                    {ward.severity.toUpperCase()}
                  </Badge>
                  <span
                    className={`text-sm font-medium ${ward.trend.startsWith("+") ? "text-red-600" : "text-green-600"}`}
                  >
                    {ward.trend}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
